'use client'

import { usePathname } from 'next/navigation'
import { langFromPath } from '@/lib/i18n'
import { consentDict } from '@/lib/consent-i18n'
import { resetConsent } from '@/lib/consent'

/**
 * Footer control that re-opens the consent banner. GDPR requires withdrawing
 * consent to be as easy as giving it, so this sits next to Privacy and Terms.
 */
export default function CookieSettingsLink() {
  const lang = langFromPath(usePathname())
  return (
    <button
      onClick={() => resetConsent()}
      style={{
        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        fontSize: 12, color: '#9B8F88', textDecoration: 'underline',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {consentDict[lang].cookieSettings}
    </button>
  )
}
