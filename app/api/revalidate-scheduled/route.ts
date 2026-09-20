import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { articles } from '@/lib/articles'
import { isPublished } from '@/lib/publish-status'

export const dynamic = 'force-dynamic'

const LOCALE_PREFIXES = ['', '/de', '/fr', '/es'] as const

/**
 * Called by Vercel cron just after midnight UTC — the moment articles scheduled
 * for that day become due.
 *
 * The blog index, the sitemap and the article pages all carry `revalidate`, so
 * they would refresh on their own eventually. This exists so publication does
 * not wait for a visitor: with ISR alone the first request after the interval
 * expires is served the stale page while the new one is built in the
 * background, which on a quiet morning means the first reader of the day sees
 * yesterday's index. Hitting revalidatePath here rebuilds them before anyone
 * asks, and the ISR interval stays as the safety net if a cron run is missed.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret) {
    // Never fall through to an open endpoint when the secret is unconfigured.
    return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 500 })
  }
  if (req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const revalidated: string[] = []

  for (const prefix of LOCALE_PREFIXES) {
    revalidatePath(`${prefix}/blog`)
    revalidated.push(`${prefix}/blog`)
    // Every article page of the route, so a newly due article drops its noindex.
    revalidatePath(`${prefix}/blog/[slug]`, 'page')
    revalidated.push(`${prefix}/blog/[slug]`)
  }

  // The sitemap is deliberately not revalidated here: in Next 14 revalidatePath
  // does not invalidate a metadata route, verified against a running server —
  // '/sitemap.xml', '/sitemap', and both the 'page' and 'layout' type variants
  // all left it serving the cached copy. Its own `revalidate` export does work
  // (also verified), so it refreshes within the hour on its own, which is well
  // inside the one-day granularity of a publish date and far more often than
  // Google re-fetches a sitemap. Adding a call here that does nothing would be
  // worse than leaving it out.

  const now = Date.now()
  const live = articles.filter(a => isPublished(a.date, now))
  const scheduled = articles
    .filter(a => !isPublished(a.date, now))
    .map(a => ({ slug: a.slug, date: a.date }))

  return NextResponse.json({
    ok: true,
    at: new Date(now).toISOString(),
    revalidated,
    published: live.length,
    scheduled,
  })
}
