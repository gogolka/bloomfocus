import type { Lang } from '@/lib/i18n'
import { privacyDict } from '@/lib/privacy-i18n'
import RichText from './RichText'

const S = {
  h2: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', margin: '36px 0 12px' } as React.CSSProperties,
  p: { fontSize: 14.5, color: '#6B5F58', lineHeight: 1.8, marginBottom: 14 } as React.CSSProperties,
}

/**
 * Shared Privacy Policy body for all four locales. Content comes from
 * privacy-i18n and is rendered through the same RichText component the blog
 * uses, so **bold** and links work here without a second markup system.
 */
export default function PrivacyContent({ lang }: { lang: Lang }) {
  const t = privacyDict[lang]
  return (
    <div style={{ background: 'var(--cream)', padding: '64px 24px 96px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(30px, 5vw, 42px)', color: '#2D2926', marginBottom: 8 }}>{t.h1}</h1>
        <p style={{ fontSize: 13, color: '#9B8F88', marginBottom: 32 }}>{t.updated}</p>

        <p style={S.p}>{t.intro}</p>

        {t.sections.map(section => (
          <section key={section.h2}>
            <h2 style={S.h2}>{section.h2}</h2>
            {section.body.map((paragraph, i) => (
              <p key={i} style={S.p}>
                <RichText text={paragraph} lang={lang} />
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}
