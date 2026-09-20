// Rich content format for article bodies.
//
// Why a small custom schema rather than MDX or a markdown library: article
// bodies live as plain data inside .ts files and are duplicated across four
// locales (lib/article-content.ts for EN, lib/articles-i18n.ts for DE/FR/ES).
// MDX would mean a build-pipeline change and would not fit that shape; a
// markdown dependency would be the first content dependency in a project whose
// package.json is deliberately just next/react/supabase. This gives the five
// features actually needed, stays fully type-checked, and renders entirely on
// the server so static generation is unaffected.

/** A bare string is shorthand for a paragraph, which is what every existing article already is. */
export type ArticleNode = string | ArticleBlock

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }

export type ArticleBody = ArticleNode[]

/**
 * Normalise a body to blocks. Existing plain-string content becomes paragraphs,
 * which is why the 30 articles × 4 locales needed no data migration at all.
 */
export function toBlocks(body: ArticleBody): ArticleBlock[] {
  return body.map(node => (typeof node === 'string' ? { type: 'p' as const, text: node } : node))
}

// ---------------------------------------------------------------------------
// Inline formatting
// ---------------------------------------------------------------------------

export type InlineToken =
  | { kind: 'text'; text: string }
  | { kind: 'bold'; text: string }
  | { kind: 'italic'; text: string }
  | { kind: 'link'; text: string; href: string; external: boolean }

/**
 * A link is only recognised in the complete `[label](target)` form. A bare
 * `[like this]` stays literal text — the Spanish habit-stacking article uses
 * square brackets as placeholders ("después de [hábito existente]") and must
 * keep rendering verbatim.
 *
 * `**bold**` precedes `*italic*` in the alternation so double asterisks win.
 */
const INLINE_RE = /\[([^\]\n]+)\]\(([^)\s]+)\)|\*\*([^*\n]+)\*\*|\*([^*\n]+)\*/g

const EXTERNAL_RE = /^(https?:)?\/\/|^mailto:|^tel:/i

export function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = []
  // exec loop rather than matchAll: the project's tsconfig has no `target`, so
  // it compiles to ES5 where iterating a RegExp iterator needs downlevelIteration.
  const re = new RegExp(INLINE_RE.source, 'g')
  let last = 0
  let m: RegExpExecArray | null

  while ((m = re.exec(text)) !== null) {
    const at = m.index
    if (at > last) tokens.push({ kind: 'text', text: text.slice(last, at) })

    if (m[1] !== undefined) {
      tokens.push({ kind: 'link', text: m[1], href: m[2], external: EXTERNAL_RE.test(m[2]) })
    } else if (m[3] !== undefined) {
      tokens.push({ kind: 'bold', text: m[3] })
    } else if (m[4] !== undefined) {
      tokens.push({ kind: 'italic', text: m[4] })
    }
    last = at + m[0].length

    // Defensive: a zero-length match would loop forever.
    if (m[0].length === 0) re.lastIndex++
  }

  if (last < text.length) tokens.push({ kind: 'text', text: text.slice(last) })
  return tokens
}

/**
 * Prefix a site-internal href with the locale segment, so one authored link
 * (`/blog/adhd-tax`) resolves correctly on all four locales without the content
 * having to be written four different ways.
 */
export function localiseHref(href: string, lang: string): string {
  if (lang === 'en') return href
  if (!href.startsWith('/')) return href
  return `/${lang}${href}`
}

/** Plain-text form of a body — used for reading time, excerpts and word counts. */
export function blocksToPlainText(body: ArticleBody): string {
  return toBlocks(body)
    .map(b => (b.type === 'ul' || b.type === 'ol' ? b.items.join(' ') : b.text))
    .join(' ')
    .replace(INLINE_RE, (_m, linkText, _href, bold, italic) => linkText ?? bold ?? italic ?? '')
}
