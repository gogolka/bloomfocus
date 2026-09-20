import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About bloom focus',
  description: 'Who makes bloom focus, why it exists, and how ADHD planning tools built without shame are different from the usual productivity advice.',
  alternates: { canonical: 'https://bloomfocus.org/about' },
}

const S = {
  h2: { fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', margin: '36px 0 12px' } as React.CSSProperties,
  p: { fontSize: 14.5, color: '#6B5F58', lineHeight: 1.8, marginBottom: 14 } as React.CSSProperties,
}

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--cream)', padding: '64px 24px 96px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(30px, 5vw, 42px)', color: '#2D2926', marginBottom: 8 }}>About bloom focus</h1>
        <p style={{ fontSize: 13, color: '#9B8F88', marginBottom: 32 }}>Planning tools for brains that don&rsquo;t run on willpower.</p>

        <p style={S.p}>bloom focus makes planning tools for people with ADHD — printable planners and workbooks, and a free web app with habit tracking, a focus timer, a brain dump, and a dopamine menu. It is a small independent project, run by one person, not a company with a content team.</p>

        <h2 style={S.h2}>Why it exists</h2>
        <p style={S.p}>Most productivity advice quietly assumes you can look at a list and feel motivated to start. ADHD brains don&rsquo;t work like that — they run on interest, urgency, novelty and challenge, not on importance. So the standard advice doesn&rsquo;t just fail, it adds a layer of shame on top of the original problem.</p>
        <p style={S.p}>bloom focus started from the opposite assumption: that the brain you have is the one you&rsquo;re planning for. Every tool here is built to work with how ADHD actually behaves — short loops, visible progress, low startup cost, and no scolding when a system falls apart. Because it will, and that&rsquo;s normal.</p>

        <h2 style={S.h2}>The blog</h2>
        <p style={S.p}>The <Link href="/blog" style={{ color: '#6E51BD' }}>blog</Link> covers how ADHD works and what helps — time blindness, executive dysfunction, rejection sensitivity, burnout, masking, and the ordinary daily friction that rarely gets written about kindly. Articles are written in English and translated in full into German, French and Spanish.</p>
        <p style={S.p}>It is written from lived experience and from published research on ADHD. It is not medical advice, and it is not a substitute for assessment or treatment by a qualified professional. If something here resonates strongly, that&rsquo;s worth taking to a doctor, not worth self-diagnosing from.</p>

        <h2 style={S.h2}>How it&rsquo;s funded</h2>
        <p style={S.p}>Two ways: paid digital products in the <Link href="/shop" style={{ color: '#6E51BD' }}>shop</Link>, and advertising on the blog. The app itself stays free and carries no ads. We don&rsquo;t sell your data, and we don&rsquo;t take sponsored posts dressed up as articles — if we ever recommend a product, it&rsquo;s because it&rsquo;s genuinely useful.</p>

        <h2 style={S.h2}>Who&rsquo;s behind it</h2>
        <p style={S.p}>bloom focus is operated by an individual entrepreneur registered in Ukraine. Full legal details of the business are available on request.</p>
        <p style={S.p}>Questions, corrections, or something you&rsquo;d like written about? The <Link href="/contact" style={{ color: '#6E51BD' }}>contact page</Link> has the details — messages get read by a person.</p>
      </div>
    </div>
  )
}
