import Link from 'next/link'
import type { Lang } from '@/lib/i18n'
import { parseInline, localiseHref } from '@/lib/article-blocks'

/**
 * Renders one string of inline article markup: **bold**, *italic*, and
 * [label](/blog/slug) links.
 *
 * Server component — no 'use client', no hooks, no effects. Parsing happens at
 * build time during static generation, so this adds nothing to the client
 * bundle and cannot affect LCP, CLS or INP.
 */
export default function RichText({ text, lang }: { text: string; lang: Lang }) {
  return (
    <>
      {parseInline(text).map((tok, i) => {
        switch (tok.kind) {
          case 'bold':
            return <strong key={i} style={{ fontWeight: 600 }}>{tok.text}</strong>
          case 'italic':
            return <em key={i}>{tok.text}</em>
          case 'link':
            return tok.external ? (
              <a
                key={i}
                href={tok.href}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                {tok.text}
              </a>
            ) : (
              <Link key={i} href={localiseHref(tok.href, lang)} style={linkStyle}>
                {tok.text}
              </Link>
            )
          default:
            return <span key={i}>{tok.text}</span>
        }
      })}
    </>
  )
}

// #6E51BD on the article's cream background is 5.58:1 — WCAG AA.
const linkStyle: React.CSSProperties = {
  color: '#6E51BD',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
}
