'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { CONSENT_EVENT, readConsent, type ConsentState } from '@/lib/consent'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * Google Analytics 4 — loaded only after the visitor opts into the "analytics"
 * category, never unconditionally.
 *
 * Two independent guards, because one is not enough:
 *   1. The <Script> tags are not rendered at all until consent.analytics is true,
 *      so gtag/js is never even requested by a visitor who declined.
 *   2. Google Consent Mode v2 defaults to analytics_storage: 'denied' (set in the
 *      root layout before any tag can run), so even if the script were loaded it
 *      could not write a cookie until `consent update` grants it.
 *
 * `afterInteractive` keeps it off the critical path, so LCP/CLS are unaffected.
 */
export default function Analytics() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const apply = (s: ConsentState | null) => setAllowed(s?.analytics === true)
    apply(readConsent())
    const onChange = (e: Event) => apply((e as CustomEvent<ConsentState | null>).detail ?? null)
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  if (!GA_ID || !allowed) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('js',new Date());
gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  )
}
