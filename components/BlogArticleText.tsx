import Link from 'next/link'

// Support the small Markdown subset used by article drafts without parsing HTML.
export function BlogInlineText({ text }: { text: string }) {
  return <>{text.split(/(\[[^\]]+\]\(\/blog\/[a-z0-9-]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\((\/blog\/[a-z0-9-]+)\)$/)
    if (link) return <Link key={i} href={link[2]} style={{ color: '#7B5FCC', textDecoration: 'underline', textUnderlineOffset: 3 }}><BlogInlineText text={link[1]} /></Link>
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.endsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>
    return part
  })}</>
}

export default function BlogArticleText({ text }: { text: string }) {
  if (text.startsWith('## ')) {
    return <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 24, color: '#2D2926', lineHeight: 1.35, marginTop: 40, marginBottom: 20 }}><BlogInlineText text={text.slice(3)} /></h2>
  }
  const lines = text.split('\n')
  if (lines.every(line => line.startsWith('- '))) {
    return <ul style={{ fontSize: 16, color: '#2D2926', lineHeight: 1.85, marginBottom: 24, paddingLeft: 24, listStyleType: 'disc' }}>
      {lines.map((line, i) => <li key={i} style={{ marginBottom: 8 }}><BlogInlineText text={line.slice(2)} /></li>)}
    </ul>
  }
  return <p style={{ fontSize: 16, color: '#2D2926', lineHeight: 1.85, marginBottom: 24 }}><BlogInlineText text={text} /></p>
}
