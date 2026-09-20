// Consent state for cookies / tracking.
//
// Two non-essential categories are tracked separately so the banner can offer
// granular choice (required under GDPR — "accept all or nothing" is not valid
// consent in the EEA, and DE/FR/ES are ~75% of this site's pages).
//
// Nothing here runs on the server: consent lives in localStorage on the
// visitor's own device and is never sent to us or to any processor.

export type ConsentCategory = 'analytics' | 'advertising'

export interface ConsentState {
  analytics: boolean
  advertising: boolean
  /** epoch ms of the decision — lets us re-ask after a policy change */
  ts: number
  /** bump CONSENT_VERSION to invalidate previously stored choices */
  v: number
}

export const CONSENT_VERSION = 1
const STORAGE_KEY = 'bf-consent'

/** Fired on window whenever the stored choice changes, so listeners can react. */
export const CONSENT_EVENT = 'bf-consent-change'

export const DENY_ALL: ConsentState = { analytics: false, advertising: false, ts: 0, v: CONSENT_VERSION }

/**
 * Read the stored decision. Returns null when the visitor has not decided yet
 * (or the stored decision is stale/corrupt), which is what makes the banner show.
 * Safe to call during render — never throws, even with storage disabled.
 */
export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<ConsentState>
    if (parsed?.v !== CONSENT_VERSION) return null
    return {
      analytics: parsed.analytics === true,
      advertising: parsed.advertising === true,
      ts: typeof parsed.ts === 'number' ? parsed.ts : 0,
      v: CONSENT_VERSION,
    }
  } catch {
    // Private mode / blocked storage — treat as "not decided", deny by default.
    return null
  }
}

export function writeConsent(choice: Pick<ConsentState, ConsentCategory>): ConsentState {
  const state: ConsentState = { ...choice, ts: Date.now(), v: CONSENT_VERSION }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage unavailable: the choice still applies for this page view via the
    // event below, it just won't be remembered on the next one.
  }
  syncGoogleConsent(state)
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }))
  return state
}

/** Used by the "Cookie settings" footer link to re-open the banner. */
export function resetConsent() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
  syncGoogleConsent(DENY_ALL)
  window.dispatchEvent(new CustomEvent<ConsentState | null>(CONSENT_EVENT, { detail: null }))
}

/**
 * Push the decision into Google Consent Mode v2.
 *
 * The defaults are set to "denied" in an inline script in the root layout, which
 * runs before any Google tag. This only ever *updates* them, so no Google tag can
 * read or write a cookie before the visitor has opted in.
 */
export function syncGoogleConsent(state: ConsentState) {
  if (typeof window === 'undefined') return
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void }
  if (typeof w.gtag !== 'function') return
  w.gtag('consent', 'update', {
    analytics_storage: state.analytics ? 'granted' : 'denied',
    ad_storage: state.advertising ? 'granted' : 'denied',
    ad_user_data: state.advertising ? 'granted' : 'denied',
    ad_personalization: state.advertising ? 'granted' : 'denied',
  })
}

/**
 * Inline script for the document head. Denies everything by default (including
 * for visitors outside the EEA — simpler, and stricter than required) and
 * re-applies any previously stored choice before the first tag loads, so a
 * returning visitor who opted in isn't silently downgraded.
 */
export const CONSENT_MODE_BOOTSTRAP = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
try{var s=JSON.parse(localStorage.getItem('${STORAGE_KEY}')||'null');
if(s&&s.v===${CONSENT_VERSION}){gtag('consent','update',{analytics_storage:s.analytics?'granted':'denied',ad_storage:s.advertising?'granted':'denied',ad_user_data:s.advertising?'granted':'denied',ad_personalization:s.advertising?'granted':'denied'})}}catch(e){}
`.trim()
