import type { Metadata } from 'next'
import Link from 'next/link'
import { CONTACT_EMAIL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact bloom focus',
  description: 'How to get in touch with bloom focus — support for orders and the app, privacy and data requests, blog corrections, and press.',
  alternates: { canonical: 'https://bloomfocus.org/contact' },
}

const EMAIL = CONTACT_EMAIL

const S = {
  h2: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', margin: '36px 0 12px' } as React.CSSProperties,
  p: { fontSize: 14.5, color: '#6B5F58', lineHeight: 1.8, marginBottom: 14 } as React.CSSProperties,
  a: { color: '#6E51BD', textDecoration: 'underline', textUnderlineOffset: '2px' } as React.CSSProperties,
}

export default function ContactPage() {
  return (
    <div style={{ background: 'var(--cream)', padding: '64px 24px 96px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(30px, 5vw, 42px)', color: '#2D2926', marginBottom: 8 }}>Contact</h1>
        <p style={{ fontSize: 13, color: '#776B64', marginBottom: 32 }}>A real person reads these. Usually within a couple of days.</p>

        <div style={{
          background: '#E8DEFF', border: '1.5px solid #D4C5F9', borderRadius: 20,
          padding: '28px 32px', textAlign: 'center', marginBottom: 8,
        }}>
          <div style={{ fontSize: 13, color: '#5C5049', marginBottom: 10 }}>Email us at</div>
          <a
            href={`mailto:${EMAIL}`}
            style={{
              fontFamily: 'Georgia, serif', fontSize: 'clamp(18px, 3.5vw, 24px)',
              color: '#5F46A0', textDecoration: 'none', wordBreak: 'break-word',
            }}
          >
            {EMAIL}
          </a>
        </div>

        <h2 style={S.h2}>What to write about</h2>
        <p style={S.p}><strong>Orders and downloads.</strong> If a file didn&rsquo;t arrive or a download link expired, email us with the address you ordered with and we&rsquo;ll re-send it. Refund and delivery terms are on the <Link href="/terms" style={S.a}>Terms</Link> page.</p>
        <p style={S.p}><strong>The app.</strong> Bugs, account trouble, or a feature that would genuinely help — all welcome. Telling us what your brain actually does is more useful than telling us what you think we want to hear.</p>
        <p style={S.p}><strong>Privacy and your data.</strong> To access, correct, export or delete your data, or to ask anything about how it&rsquo;s handled, email the same address — we respond within 30 days, as set out in the <Link href="/privacy" style={S.a}>Privacy Policy</Link>.</p>
        <p style={S.p}><strong>Blog corrections.</strong> If something on the <Link href="/blog" style={S.a}>blog</Link> is inaccurate or out of date, please tell us. Corrections to health-related content are taken seriously and made quickly.</p>
        <p style={S.p}><strong>Press, partnerships and translation.</strong> Also this address. We don&rsquo;t publish sponsored posts disguised as articles, so please don&rsquo;t pitch those.</p>

        <h2 style={S.h2}>What we can&rsquo;t do</h2>
        <p style={S.p}>We can&rsquo;t give medical advice, diagnose ADHD, or recommend medication — we&rsquo;re not clinicians, and it would be irresponsible to try. If you&rsquo;re looking for an assessment, a GP or a qualified mental-health professional is the right first step. If you&rsquo;re in crisis, please contact your local emergency services or a crisis line in your country.</p>

        <h2 style={S.h2}>Business details</h2>
        <p style={S.p}>bloom focus is operated by an individual entrepreneur registered in Ukraine. Full legal and registration details are available on request to the address above. More about the project on the <Link href="/about" style={S.a}>About</Link> page.</p>
      </div>
    </div>
  )
}
