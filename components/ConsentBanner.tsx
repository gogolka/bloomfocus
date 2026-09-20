'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { langFromPath } from '@/lib/i18n'
import { consentDict } from '@/lib/consent-i18n'
import { CONSENT_EVENT, readConsent, writeConsent, type ConsentState } from '@/lib/consent'

/**
 * Cookie consent banner.
 *
 * Renders nothing until mounted, so the server-rendered HTML is identical for
 * every visitor and stays fully cacheable/static. It is `position: fixed`, so
 * appearing after hydration shifts nothing else on the page — CLS stays at 0.
 */
export default function ConsentBanner() {
  const pathname = usePathname()
  const lang = langFromPath(pathname)
  const t = consentDict[lang]

  // `undefined` = not yet read (render nothing), `null` = no decision (show banner)
  const [consent, setConsent] = useState<ConsentState | null | undefined>(undefined)
  const [detailed, setDetailed] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [advertising, setAdvertising] = useState(false)

  useEffect(() => {
    setConsent(readConsent())
    const onChange = (e: Event) => {
      const next = (e as CustomEvent<ConsentState | null>).detail ?? null
      setConsent(next)
      if (next === null) setDetailed(false)
    }
    window.addEventListener(CONSENT_EVENT, onChange)
    return () => window.removeEventListener(CONSENT_EVENT, onChange)
  }, [])

  if (consent !== null) return null

  const decide = (choice: { analytics: boolean; advertising: boolean }) => {
    setConsent(writeConsent(choice))
  }

  const privacyHref = lang === 'en' ? '/privacy' : `/${lang}/privacy`

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t.ariaLabel}
      style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 9999,
        padding: '16px', display: 'flex', justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          background: '#FEFCFA',
          border: '1.5px solid #D4C5F9',
          borderRadius: 20,
          boxShadow: '0 12px 48px rgba(45,41,38,0.18)',
          padding: '22px 24px',
          maxWidth: 620,
          width: '100%',
          maxHeight: 'calc(100vh - 32px)',
          overflowY: 'auto',
        }}
      >
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 19, color: '#2D2926', marginBottom: 10 }}>
          {t.title}
        </div>
        <p style={{ fontSize: 14, color: '#5C5049', lineHeight: 1.65, marginBottom: 14 }}>{t.body}</p>

        {detailed && (
          <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Category
              title={t.necessaryTitle}
              desc={t.necessaryDesc}
              checked
              disabled
              badge={t.necessaryAlways}
            />
            <Category
              title={t.analyticsTitle}
              desc={t.analyticsDesc}
              checked={analytics}
              onChange={setAnalytics}
            />
            <Category
              title={t.advertisingTitle}
              desc={t.advertisingDesc}
              checked={advertising}
              onChange={setAdvertising}
            />
          </div>
        )}

        <Link
          href={privacyHref}
          style={{ fontSize: 13, color: '#6E51BD', textDecoration: 'underline', display: 'inline-block', marginBottom: 16 }}
        >
          {t.privacyLink}
        </Link>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {detailed ? (
            <>
              <button style={primaryBtn} onClick={() => decide({ analytics, advertising })}>
                {t.save}
              </button>
              <button style={outlineBtn} onClick={() => setDetailed(false)}>
                {t.back}
              </button>
            </>
          ) : (
            <>
              <button style={primaryBtn} onClick={() => decide({ analytics: true, advertising: true })}>
                {t.acceptAll}
              </button>
              <button style={outlineBtn} onClick={() => decide({ analytics: false, advertising: false })}>
                {t.rejectAll}
              </button>
              <button style={textBtn} onClick={() => setDetailed(true)}>
                {t.customise}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Category({
  title, desc, checked, onChange, disabled, badge,
}: {
  title: string
  desc: string
  checked: boolean
  onChange?: (v: boolean) => void
  disabled?: boolean
  badge?: string
}) {
  return (
    <label
      style={{
        display: 'flex', gap: 12, alignItems: 'flex-start',
        background: '#FFF8F0', border: '1px solid rgba(45,41,38,0.08)',
        borderRadius: 12, padding: '12px 14px',
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange?.(e.target.checked)}
        style={{ marginTop: 3, accentColor: '#7B5FCC', width: 16, height: 16, flexShrink: 0 }}
      />
      <span style={{ flex: 1 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#2D2926' }}>{title}</span>
          {badge && (
            <span style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5F46A0', background: '#E8DEFF', borderRadius: 100, padding: '2px 8px' }}>
              {badge}
            </span>
          )}
        </span>
        <span style={{ display: 'block', fontSize: 12.5, color: '#5C5049', lineHeight: 1.55, marginTop: 4 }}>{desc}</span>
      </span>
    </label>
  )
}

const baseBtn: React.CSSProperties = {
  borderRadius: 100,
  padding: '11px 22px',
  fontSize: 14,
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: "'DM Sans', sans-serif",
}

// #7B5FCC on white = 4.83:1 — passes WCAG AA for normal text.
const primaryBtn: React.CSSProperties = { ...baseBtn, background: '#7B5FCC', color: '#FFFFFF', border: 'none' }
const outlineBtn: React.CSSProperties = { ...baseBtn, background: '#FFFFFF', color: '#6E51BD', border: '1.5px solid #D4C5F9' }
const textBtn: React.CSSProperties = { ...baseBtn, background: 'transparent', color: '#5C5049', border: 'none', textDecoration: 'underline' }
