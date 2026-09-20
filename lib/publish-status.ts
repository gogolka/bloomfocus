// Scheduled publishing.
//
// An article's `date` field is both its display label and its publish gate: the
// article stays out of the blog index, the sitemap and related-article
// suggestions until that date arrives.
//
// Dates are interpreted as midnight UTC, not server-local midnight. `new
// Date('September 21, 2026')` yields local midnight, so on a server west of UTC
// an article would go live hours late and on one east of UTC hours early. Vercel
// runs Node in UTC today, but pinning it here means the behaviour does not
// silently depend on that staying true.

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
}

const DATE_RE = /^([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})$/

/**
 * Parse the `'September 21, 2026'` format into a midnight-UTC timestamp.
 * Returns null for anything it does not recognise.
 */
export function parseArticleDate(dateString: string): number | null {
  const m = DATE_RE.exec(dateString.trim())
  if (!m) return null
  const month = MONTHS[m[1].toLowerCase()]
  if (month === undefined) return null
  const day = Number(m[2])
  const year = Number(m[3])
  if (day < 1 || day > 31) return null
  const ts = Date.UTC(year, month, day)
  // Reject overflow like "February 31" rolling into March.
  const d = new Date(ts)
  if (d.getUTCMonth() !== month || d.getUTCDate() !== day) return null
  return ts
}

/**
 * True once the article's date has arrived (midnight UTC on that day).
 *
 * Fails open: a date this cannot parse is treated as published. A typo in a
 * date string should never silently unpublish a live article — the failure mode
 * of showing something early is far less damaging than an article vanishing
 * from the site with no error anywhere.
 */
export function isPublished(dateString: string, now: number = Date.now()): boolean {
  const ts = parseArticleDate(dateString)
  if (ts === null) return true
  return now >= ts
}

/** Metadata robots value for a page that should not be indexed yet. */
export const NOINDEX_FOLLOW = { index: false, follow: true } as const
