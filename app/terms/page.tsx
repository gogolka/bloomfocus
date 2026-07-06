import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — bloom focus',
  description: 'Terms of service, delivery and refund policy for bloom focus digital products.',
  alternates: { canonical: 'https://bloomfocus.org/terms' },
}

const S = {
  h2: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', margin: '36px 0 12px' } as React.CSSProperties,
  p: { fontSize: 14.5, color: '#6B5F58', lineHeight: 1.8, marginBottom: 14 } as React.CSSProperties,
}

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--cream)', padding: '64px 24px 96px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(30px, 5vw, 42px)', color: '#2D2926', marginBottom: 8 }}>Terms of Service</h1>
        <p style={{ fontSize: 13, color: '#9B8F88', marginBottom: 32 }}>Last updated: June 2026</p>

        <p style={S.p}>These terms apply to purchases and use of bloomfocus.org, operated by an individual entrepreneur registered in Ukraine ("we", "us"). By buying a product or using the app, you agree to these terms.</p>

        <h2 style={S.h2}>Digital products</h2>
        <p style={S.p}>All planners, workbooks and posters are digital PDF files. Nothing physical is shipped. Prices are shown in USD; your bank may apply its own conversion rate if your card is in another currency.</p>

        <h2 style={S.h2}>Delivery</h2>
        <p style={S.p}>Delivery is instant: after successful payment, a download link appears on the confirmation page and is also sent to your email. Download links are valid for 7 days. If your link expires or the email doesn't arrive, contact us at <a href="mailto:hello@bloomfocus.org" style={{ color: '#7B5FCC' }}>hello@bloomfocus.org</a> and we'll send a fresh one — you don't lose access to what you bought.</p>

        <h2 style={S.h2}>Refunds</h2>
        <p style={S.p}>Because digital files cannot be "returned", all sales are generally final once the file has been downloaded. That said, we're humans first: if you bought the wrong product by mistake, were charged twice, or the file is broken — email us within 14 days and we'll make it right with a replacement or a refund.</p>

        <h2 style={S.h2}>Personal use license</h2>
        <p style={S.p}>Your purchase gives you a lifetime personal-use license: print as many copies as you like for yourself, use it digitally on your devices. You may not resell, redistribute, share the files publicly, or use them commercially.</p>

        <h2 style={S.h2}>Pro subscription</h2>
        <p style={S.p}>The optional Pro plan for the app is billed monthly ($1.99) or annually ($19.99) and renews automatically. You can cancel anytime in Settings — access continues until the end of the paid period, and no further charges are made. No partial refunds for unused time.</p>

        <h2 style={S.h2}>Not medical advice</h2>
        <p style={S.p}>bloom focus products are self-organisation and educational tools inspired by CBT techniques. They are not medical devices, do not diagnose or treat any condition, and are not a substitute for professional care. If you're struggling, please talk to a qualified professional.</p>

        <h2 style={S.h2}>The app</h2>
        <p style={S.p}>The free app is provided "as is". We work hard to keep it reliable, but we can't guarantee uninterrupted availability. You own the content you create and can export it anytime from Settings.</p>

        <h2 style={S.h2}>Changes</h2>
        <p style={S.p}>We may update these terms as the product evolves; the current version always lives at this page. Material changes to paid services will be communicated by email.</p>

        <h2 style={S.h2}>Contact</h2>
        <p style={S.p}>Questions: <a href="mailto:hello@bloomfocus.org" style={{ color: '#7B5FCC' }}>hello@bloomfocus.org</a>. Full legal details of the business are available on request.</p>
      </div>
    </div>
  )
}
