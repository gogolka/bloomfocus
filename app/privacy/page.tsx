import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — bloom focus',
  description: 'How bloom focus collects, uses and protects your data.',
  alternates: { canonical: 'https://bloomfocus.org/privacy' },
}

const S = {
  h2: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', margin: '36px 0 12px' } as React.CSSProperties,
  p: { fontSize: 14.5, color: '#6B5F58', lineHeight: 1.8, marginBottom: 14 } as React.CSSProperties,
}

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--cream)', padding: '64px 24px 96px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(30px, 5vw, 42px)', color: '#2D2926', marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ fontSize: 13, color: '#9B8F88', marginBottom: 32 }}>Last updated: June 2026</p>

        <p style={S.p}>bloom focus (bloomfocus.org) is operated by an individual entrepreneur registered in Ukraine. We keep data collection to the minimum needed to run the shop and the app, and we never sell your data. This page explains what we collect, why, and what your rights are.</p>

        <h2 style={S.h2}>What we collect</h2>
        <p style={S.p}><strong>When you buy a product:</strong> your email address and name (if provided), the product you bought, and payment status. Card details are processed entirely by our payment provider WayForPay — we never see or store your card number.</p>
        <p style={S.p}><strong>When you join the newsletter or take the ADHD quiz:</strong> your email address, name (if provided), quiz result type, and preferred language.</p>
        <p style={S.p}><strong>When you create an app account:</strong> your email, password (stored encrypted by our infrastructure provider Supabase), and the content you create — tasks, habits, brain dumps, settings.</p>

        <h2 style={S.h2}>Why we collect it</h2>
        <p style={S.p}>To deliver purchased files, send order confirmations, provide the app service, send newsletter emails you signed up for, and improve the product. That's it. We do not use advertising trackers on this site.</p>

        <h2 style={S.h2}>Who processes your data</h2>
        <p style={S.p}>We use a small number of trusted processors: <strong>Supabase</strong> (database and authentication, EU-hosted), <strong>Vercel</strong> (website hosting), <strong>Brevo</strong> (transactional and newsletter emails, EU-based), and <strong>WayForPay</strong> (payment processing). Each receives only the data needed for its function.</p>

        <h2 style={S.h2}>How long we keep it</h2>
        <p style={S.p}>Order records are kept as long as required for accounting purposes. Newsletter data is kept until you unsubscribe — every email has an unsubscribe link. App account data is kept until you delete your account; you can export everything you've created at any time from Settings.</p>

        <h2 style={S.h2}>Your rights (GDPR)</h2>
        <p style={S.p}>If you're in the EU/EEA, you have the right to access, correct, export, or delete your personal data, and to object to or restrict its processing. To exercise any of these rights, email us at <a href="mailto:hello@bloomfocus.org" style={{ color: '#7B5FCC' }}>hello@bloomfocus.org</a> — we respond within 30 days.</p>

        <h2 style={S.h2}>Cookies</h2>
        <p style={S.p}>We use only essential cookies: session cookies for app login and a language preference. No advertising or cross-site tracking cookies are used.</p>

        <h2 style={S.h2}>Children</h2>
        <p style={S.p}>Our products and app are intended for adults (18+). We do not knowingly collect data from children.</p>

        <h2 style={S.h2}>Contact</h2>
        <p style={S.p}>Questions about this policy or your data: <a href="mailto:hello@bloomfocus.org" style={{ color: '#7B5FCC' }}>hello@bloomfocus.org</a>. Full legal details of the business are available on request.</p>
      </div>
    </div>
  )
}
