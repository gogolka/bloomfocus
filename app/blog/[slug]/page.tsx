import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { articles } from '@/lib/articles'

const articleContent: Record<string, string[]> = {
  'why-adhd-brains-struggle-with-planning': [
    'If you have ADHD, planning probably feels like trying to hold water in your hands. You start with good intentions — a fresh planner, a new system, an optimistic Monday morning — and somehow, by Tuesday, it\'s already fallen apart. This isn\'t a character flaw. It\'s neuroscience.',
    'ADHD affects the prefrontal cortex, the part of the brain responsible for executive function — planning, prioritizing, time management, and starting tasks. When this system doesn\'t work the way neurotypical systems do, traditional planning methods don\'t just fail to help. They actively make things worse.',
    'Traditional planners assume you can look at a list and feel motivated to start. For ADHD brains, motivation doesn\'t work that way. Interest, urgency, novelty, and challenge drive ADHD brains — not importance or priority. A task can be critically important and still feel impossible to start, while a completely irrelevant but interesting task gets done immediately.',
    'Time blindness is another major factor. Most people have an internal clock that helps them feel time passing. ADHD brains often lack this — leading to the experience of suddenly realizing hours have passed, or that a deadline is tomorrow when it felt like it was weeks away.',
    'What actually helps? Systems that work with these patterns rather than against them. Energy-based planning (scheduling tasks based on your natural energy levels). Time timers (visual representations of time passing). Body doubling (working alongside someone else). And removing the shame spiral that comes from system failure — because that shame is often what makes starting even harder.',
    'The goal isn\'t to fix your ADHD brain. The goal is to build a life that works for the brain you have.',
  ],
  'dopamine-menu-guide': [
    'A dopamine menu is exactly what it sounds like: a curated list of activities that give your brain a dopamine boost, organized like a restaurant menu. Quick hits. Medium breaks. Full recharge options. The idea is simple, but for ADHD brains, it can be genuinely life-changing.',
    'ADHD is, in many ways, a dopamine regulation disorder. The brain doesn\'t produce or process dopamine in the typical way — which is why ADHD brains constantly seek stimulation, novelty, and reward. Without enough dopamine, starting tasks feels impossible. Focus evaporates. Motivation disappears entirely.',
    'A dopamine menu gives you a pre-planned, guilt-free way to regulate your dopamine levels. Instead of doom-scrolling or impulsively eating a whole bag of chips (both totally understandable dopamine-seeking behaviors), you have options ready. Options you chose when your brain was in a good state, not when it was desperate.',
    'How to build yours: Start by listing activities that genuinely light you up. Not things you think you should enjoy — things that actually work. Dancing in your kitchen. A specific YouTube channel. A five-minute walk. Texting a friend something nice. Then organize them by time and energy cost.',
    'Quick hits (1-5 minutes): things you can do between tasks without losing momentum. Medium breaks (10-20 minutes): real recharge time. Deep recharge (30+ minutes): for when you\'re genuinely depleted. The key is having the list ready before you need it — because when dopamine is low, decision-making is even harder.',
    'Print it. Put it somewhere visible. And remember: using your dopamine menu isn\'t procrastinating. It\'s maintenance.',
  ],
  'time-blindness-adhd': [
    'Time blindness is one of the most misunderstood aspects of ADHD. It\'s not that people with ADHD don\'t care about time, or that they\'re irresponsible, or that they just need to "try harder." Time blindness is neurological — the ADHD brain genuinely experiences time differently.',
    'Dr. Russell Barkley, one of the leading researchers in ADHD, describes it this way: most people experience time as a continuous flow they can feel. ADHD brains tend to experience only two times: now, and not now. The distance between "an hour from now" and "three weeks from now" is essentially the same — both are "not now."',
    'This explains so much. Why deadlines feel far away and then suddenly too close. Why 20 minutes in the shower feels like 5. Why you can\'t feel yourself running late until you\'re already very late. Why hyperfocus can swallow hours without you noticing.',
    'What helps? Making time visible. A large analog clock in your workspace. A time timer (a visual timer that shows time passing as a shrinking red arc). Setting alarms not just for when you need to leave, but for 30 minutes before, 15 minutes before. Working in timed blocks rather than open-ended sessions.',
    'Transition warnings also help enormously — giving yourself a 5-minute heads up before switching tasks, rather than expecting your brain to switch instantly. Many ADHD brains find transitions genuinely painful, and part of this is the jarring shift from "now" to suddenly having to acknowledge "not now" tasks.',
    'Time blindness is real. It\'s not an excuse — it\'s a symptom. And like all ADHD symptoms, it responds best to accommodation rather than punishment.',
  ],
  'habit-stacking-adhd': [
    'Most habit advice is designed for neurotypical brains. Do it every day for 21 days and it becomes automatic. Pick a cue, a routine, and a reward. Build your willpower. For ADHD brains, this advice often fails completely — not because the advice is wrong, but because it assumes a consistent, predictable internal state that ADHD simply doesn\'t provide.',
    'Habit stacking is different. Instead of trying to build isolated habits through repetition, you attach new behaviors to existing ones. The existing habit becomes the cue. This works much better for ADHD brains because it removes one of the biggest barriers: remembering to do the thing.',
    'The key adaptation for ADHD is starting smaller than you think necessary. Embarrassingly small. The goal of a new habit isn\'t to do the full thing every day — it\'s to make the behavior automatic. A one-minute habit that you do every day is infinitely more valuable than a 20-minute habit you do three times and abandon.',
    'Attach your new habit to something that already happens reliably. After I make my morning coffee → I will write three intentions for the day. After I sit down at my desk → I will do a 2-minute brain dump. After I brush my teeth at night → I will put tomorrow\'s first task on a sticky note.',
    'Expect inconsistency. ADHD means your capacity varies enormously from day to day. On bad days, your habit might look like a 10-second version. That still counts. The streak isn\'t the point — the direction is.',
    'And if you miss days? That\'s not failure. That\'s ADHD. The habit isn\'t broken by missing days. It only dies if you decide it\'s dead. Start again. Every day is a new chance to build the life your brain is capable of.',
  ],
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) return { title: 'Article not found' }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `https://bloomfocus.org/blog/${params.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
    },
  }
}

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find(a => a.slug === params.slug)
  if (!article) notFound()

  const content = articleContent[params.slug] || []

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ padding: '64px 24px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,222,255,0.5) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <Link href="/blog" style={{ textDecoration: 'none', fontSize: 13, color: '#9B8F88', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            ← Back to blog
          </Link>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            <div style={{ background: article.tagColor, borderRadius: 100, padding: '4px 14px', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: article.tagTextColor }}>
              {article.tag}
            </div>
            <div style={{ fontSize: 13, color: '#9B8F88' }}>{article.date} · {article.readTime}</div>
          </div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 4vw, 40px)', color: '#2D2926', lineHeight: 1.2, marginBottom: 20 }}>
            {article.title}
          </h1>
          <p style={{ fontSize: 16, color: '#6B5F58', lineHeight: 1.7 }}>{article.excerpt}</p>
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #B8A4E8, #FFBFA8, #B8D4B8)' }} />
      </section>

      {/* Content */}
      <article style={{ padding: '48px 24px 80px', maxWidth: 720, margin: '0 auto' }}>
        {content.map((paragraph, i) => (
          <p key={i} style={{ fontSize: 16, color: '#2D2926', lineHeight: 1.85, marginBottom: 24 }}>
            {paragraph}
          </p>
        ))}

        {/* CTA */}
        <div style={{ marginTop: 56, padding: '32px', background: '#E8DEFF', border: '1.5px solid #D4C5F9', borderRadius: 20, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 12 }}>
            Ready to try tools that actually work?
          </div>
          <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6, marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
            Browse the bloom focus toolkit — designed for ADHD brains, built with care.
          </p>
          <Link href="/shop" style={{
            textDecoration: 'none', background: '#B8A4E8', color: 'white',
            padding: '12px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, display: 'inline-block',
          }}>
            Shop the toolkit ✨
          </Link>
        </div>

        {/* Related articles */}
        <div style={{ marginTop: 56 }}>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 20 }}>More from the blog</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {articles.filter(a => a.slug !== params.slug).slice(0, 2).map((a, i) => (
              <Link key={i} href={`/blog/${a.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
                  <span style={{ fontSize: 28 }}>{a.emoji}</span>
                  <div>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: '#2D2926', marginBottom: 4 }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: '#9B8F88' }}>{a.readTime}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
