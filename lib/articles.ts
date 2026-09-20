import { isPublished } from '@/lib/publish-status'
import { topics, topicBySlug, type Topic, type TopicSlug } from '@/lib/topics'

export const articles = [
  {
    slug: 'why-adhd-brains-struggle-with-planning',
    title: 'Why ADHD Brains Struggle with Planning (And What Actually Helps)',
    excerpt: 'Planning feels impossible — not because you\'re lazy, but because your brain is wired differently. Here\'s the science, and what you can do about it.',
    date: 'June 8, 2026',
    readTime: '8 min read',
    topic: 'focus-and-executive-function',
    emoji: '🧠',
  },
  {
    slug: 'dopamine-menu-guide',
    title: 'What Is a Dopamine Menu and How to Make One That Works',
    excerpt: 'A dopamine menu is one of the most effective ADHD tools — and it\'s surprisingly simple. Here\'s how to build yours.',
    date: 'June 8, 2026',
    readTime: '7 min read',
    topic: 'tools-and-systems',
    emoji: '🍬',
  },
  {
    slug: 'time-blindness-adhd',
    title: 'Time Blindness: Why You Can\'t Feel Time Passing (And What Helps)',
    excerpt: 'Time blindness is one of the most misunderstood ADHD symptoms. It\'s not about being irresponsible — it\'s neurological.',
    date: 'June 8, 2026',
    readTime: '7 min read',
    topic: 'focus-and-executive-function',
    emoji: '⏰',
  },
  {
    slug: 'habit-stacking-adhd',
    title: 'Habit Stacking for ADHD: Building Routines That Actually Stick',
    excerpt: 'Most habit advice fails ADHD brains. Here\'s a gentler approach that works with how your brain actually functions.',
    date: 'June 8, 2026',
    readTime: '7 min read',
    topic: 'tools-and-systems',
    emoji: '🌱',
  },
  {
    slug: 'do-i-have-adhd-test',
    title: 'Do You Have ADHD? How to Know — and What to Do Next',
    excerpt: 'Wondering if you have ADHD? Here are the signs adults actually experience, how the inattentive and hyperactive types differ, and the steps to take if it resonates.',
    date: 'June 11, 2026',
    readTime: '8 min read',
    topic: 'diagnosis-and-treatment',
    emoji: '🧠',
  },
  {
    slug: 'adhd-paralysis',
    title: 'ADHD Paralysis: Why You Freeze — and How to Get Unstuck',
    excerpt: 'You know exactly what to do, you want to do it, and you still can\'t move. That\'s ADHD paralysis. Here\'s why it happens and gentle ways to break the freeze.',
    date: 'June 11, 2026',
    readTime: '8 min read',
    topic: 'focus-and-executive-function',
    emoji: '🧊',
  },
  {
    slug: 'best-planner-for-adhd',
    title: 'The Best Planner for ADHD (And Why Most Planners Fail You)',
    excerpt: 'Most planners are built for neurotypical brains, which is why they collect dust by week two. Here\'s what an ADHD-friendly planner actually needs to have.',
    date: 'June 10, 2026',
    readTime: '8 min read',
    topic: 'tools-and-systems',
    emoji: '📔',
  },
  {
    slug: 'adhd-in-women',
    title: 'ADHD in Women: The Signs That Get Missed for Years',
    excerpt: 'ADHD in women is chronically underdiagnosed because it often looks like anxiety, perfectionism, or just being "scattered." Here are the signs that get overlooked.',
    date: 'June 10, 2026',
    readTime: '8 min read',
    topic: 'who-has-adhd',
    emoji: '🌷',
  },
  {
    slug: `adhd-rejection-sensitive-dysphoria`,
    title: `ADHD and Rejection Sensitive Dysphoria: Why Criticism Hurts So Much`,
    excerpt: `If one small criticism can ruin your whole day, you're not too sensitive — you might be feeling RSD, one of the most painful and least-known parts of ADHD.`,
    date: `June 12, 2026`,
    readTime: `8 min read`,
    topic: 'emotions-and-burnout',
    emoji: `💔`,
  },
  {
    slug: `adhd-and-sleep`,
    title: `ADHD and Sleep: Why Your Brain Won't Switch Off at Night`,
    excerpt: `Racing thoughts at midnight, a second wind right when you should sleep, mornings that feel impossible — ADHD and sleep struggles go hand in hand. Here's why, and what helps.`,
    date: `June 12, 2026`,
    readTime: `8 min read`,
    topic: 'daily-life',
    emoji: `😴`,
  },
  {
    slug: `body-doubling-adhd`,
    title: `Body Doubling: The ADHD Focus Hack That Actually Works`,
    excerpt: `Why is it so much easier to work when someone else is in the room? Body doubling turns that into a strategy — one of the most reliable ADHD focus tools there is.`,
    date: `June 13, 2026`,
    readTime: `7 min read`,
    topic: 'tools-and-systems',
    emoji: `👯`,
  },
  {
    slug: `adhd-burnout`,
    title: `ADHD Burnout: The Signs You're Running on Empty (And How to Recover)`,
    excerpt: `ADHD burnout isn't ordinary tiredness — it's the collapse that comes after months of masking and overcompensating. Here's how to spot it and gently recover.`,
    date: `June 13, 2026`,
    readTime: `8 min read`,
    topic: 'emotions-and-burnout',
    emoji: `🔋`,
  },
  {
    slug: `how-to-clean-with-adhd`,
    title: `How to Clean Your House with ADHD Without the Overwhelm`,
    excerpt: `If cleaning feels impossible until it becomes a crisis, you're not lazy — your brain just needs a different approach. Here's how to clean with an ADHD brain, step by gentle step.`,
    date: `June 14, 2026`,
    readTime: `7 min read`,
    topic: 'daily-life',
    emoji: `🧹`,
  },
  {
    slug: `adhd-emotional-dysregulation`,
    title: `ADHD and Emotional Dysregulation: Why Your Feelings Hit So Hard`,
    excerpt: `When feelings arrive too fast, hit too hard, and last too long — that's not oversensitivity, that's ADHD. Here's the neurology behind it and what actually helps.`,
    date: `June 14, 2026`,
    readTime: `8 min read`,
    topic: 'emotions-and-burnout',
    emoji: `🌊`,
  },
  {
    slug: `adhd-hyperfocus`,
    title: `ADHD Hyperfocus: Why Your Brain Sometimes Can't Stop`,
    excerpt: `Hyperfocus is the paradoxical flip side of ADHD distractibility — hours of involuntary absorption you can't control. Here's why it happens and how to work with it.`,
    date: `June 14, 2026`,
    readTime: `8 min read`,
    topic: 'focus-and-executive-function',
    emoji: `🔬`,
  },
  {
    slug: `adhd-executive-dysfunction`,
    title: `ADHD Executive Dysfunction: Why Simple Tasks Feel Impossible`,
    excerpt: `Executive dysfunction is the core of ADHD — not laziness, not bad will. Here's what happens in the brain and why some days are so much harder than others.`,
    date: `June 14, 2026`,
    readTime: `9 min read`,
    topic: 'focus-and-executive-function',
    emoji: `🧠`,
  },
  {
    slug: `adhd-and-anxiety`,
    title: `ADHD and Anxiety: Why They So Often Go Together`,
    excerpt: `ADHD and anxiety disorders co-occur in roughly half of adults with ADHD — but why? Here's the neurological link and how to tell what's causing what.`,
    date: `June 14, 2026`,
    readTime: `8 min read`,
    topic: 'emotions-and-burnout',
    emoji: `💙`,
  },
  {
    slug: `adhd-sensory-sensitivity`,
    title: `ADHD and Sensory Sensitivity: When the World Is Too Loud, Too Bright, Too Much`,
    excerpt: `Many people with ADHD are extraordinarily sensitive to sounds, light, textures or crowds. It's not drama — it's neurology. Here's what's behind it.`,
    date: `June 14, 2026`,
    readTime: `8 min read`,
    topic: 'co-occurring-and-sensory',
    emoji: `✨`,
  },
  {
    slug: `adhd-tax`,
    title: `The ADHD Tax: The Hidden Cost of Having Your Brain`,
    excerpt: `Late fees, forgotten subscriptions, replacing things you already own. The ADHD tax is real, it's expensive — and it's not a character flaw.`,
    date: 'July 6, 2026',
    readTime: '8 min read',
    topic: 'daily-life',
    emoji: '💸',
  },
  {
    slug: `adhd-waiting-mode`,
    title: `Waiting Mode: Why You Can't Do Anything Before a 3 PM Appointment`,
    excerpt: `One appointment in the afternoon, and the entire day is gone. If this sounds familiar, you're experiencing waiting mode — and no, you're not being dramatic.`,
    date: 'July 6, 2026',
    readTime: '7 min read',
    topic: 'focus-and-executive-function',
    emoji: '⏳',
  },
  {
    slug: `adhd-doom-piles`,
    title: `Doom Piles: Why Your Clutter Isn't Laziness`,
    excerpt: `That pile of stuff on the chair. The box of random things. The bag you haven't unpacked. Doom piles have a logic — and once you see it, you can work with it.`,
    date: 'July 6, 2026',
    readTime: '7 min read',
    topic: 'daily-life',
    emoji: '📦',
  },
  {
    slug: `adhd-object-permanence`,
    title: `Out of Sight, Gone Forever: ADHD and Object Permanence`,
    excerpt: `Food forgotten in the fridge. Friends you love but never text. Projects that vanish the moment you close the tab. Here's why — and what helps.`,
    date: 'July 6, 2026',
    readTime: '7 min read',
    topic: 'focus-and-executive-function',
    emoji: '🫥',
  },
  {
    slug: `adhd-texting`,
    title: `Why Replying to Texts Feels Impossible (You're Not a Bad Friend)`,
    excerpt: `You read the message. You meant to reply. It's been eleven days. The ADHD texting spiral, explained with zero judgment.`,
    date: 'July 6, 2026',
    readTime: '7 min read',
    topic: 'daily-life',
    emoji: '📱',
  },
  {
    slug: `gifted-kid-adhd`,
    title: `From "Gifted Kid" to Burnt-Out Adult: The ADHD Pipeline Nobody Warned You About`,
    excerpt: `School was easy, so nobody looked closer. Then life stopped being a classroom — and everything fell apart. This story is more common than you think.`,
    date: 'July 6, 2026',
    readTime: '8 min read',
    topic: 'who-has-adhd',
    emoji: '🎓',
  },
  {
    slug: `adhd-masking`,
    title: `ADHD Masking: The Exhausting Performance of Being Fine`,
    excerpt: `Smiling through the chaos, mimicking "normal," apologizing constantly. Masking works — until the bill arrives. Here's what it costs and how to put it down.`,
    date: 'July 6, 2026',
    readTime: '8 min read',
    topic: 'emotions-and-burnout',
    emoji: '🎭',
  },
  {
    slug: `revenge-bedtime-procrastination`,
    title: `Revenge Bedtime Procrastination: Why You Won't Go to Sleep`,
    excerpt: `You're exhausted. You know tomorrow will hurt. And yet at 1 AM you're still scrolling — on purpose. There's a reason, and it's not lack of discipline.`,
    date: 'July 6, 2026',
    readTime: '8 min read',
    topic: 'daily-life',
    emoji: '🌙',
  },
  {
    slug: `adhd-transitions`,
    title: `Why You Can't Start, Stop, or Leave the House: ADHD and Transitions`,
    excerpt: `The shower you avoided for hours and then didn't want to leave. The game you can't quit. The door you can't walk out of. It's all the same thing.`,
    date: 'July 6, 2026',
    readTime: '8 min read',
    topic: 'focus-and-executive-function',
    emoji: '🚪',
  },
  {
    slug: `adhd-hobby-graveyard`,
    title: `The Hobby Graveyard: Why You Abandon Everything You Once Loved`,
    excerpt: `The guitar. The yarn. The roller skates. The language app. You weren't flaky — your brain was doing exactly what it's built to do. A kinder way to look at the graveyard.`,
    date: 'July 6, 2026',
    readTime: '8 min read',
    topic: 'daily-life',
    emoji: '🎨',
  },
  {
    slug: `adhd-and-food`,
    title: `Forgetting to Eat, Then Eating Everything: ADHD and Food`,
    excerpt: `Skipping meals without noticing, then inhaling snacks at midnight. Eating the same meal for weeks. Cooking feeling impossible. None of this is a willpower problem.`,
    date: 'July 6, 2026',
    readTime: '8 min read',
    topic: 'daily-life',
    emoji: '🍜',
  },
  {
    slug: `adhd-decision-fatigue`,
    title: `Why Choosing What to Watch Takes an Hour: ADHD and Decision Fatigue`,
    excerpt: `Forty minutes of scrolling the menu, then you rewatch the same show anyway. Decisions drain ADHD brains faster — here's how to spend fewer of them.`,
    date: 'July 6, 2026',
    readTime: '8 min read',
    topic: 'focus-and-executive-function',
    emoji: '🤯',
  },
  {
    slug: 'what-is-adhd',
    title: 'What Is ADHD? A Clear, No-Jargon Explanation',
    excerpt: 'What is ADHD, really? A straightforward look at what\'s actually going on in the brain — no jargon, no stereotypes, no shame.',
    date: 'September 19, 2026',
    readTime: '9 min read',
    topic: 'adhd-basics',
    emoji: '🧠',
  },
  {
    slug: 'adhd-symptoms',
    title: 'ADHD Symptoms: What They Actually Look Like Day to Day',
    excerpt: 'ADHD symptoms rarely look like the textbook description. Here\'s what they actually look like in real life — in adults, not just kids.',
    date: 'September 21, 2026',
    readTime: '7 min read',
    topic: 'adhd-basics',
    emoji: '🔍',
  },
  {
    slug: 'adhd-diagnosis-how-it-works',
    title: 'ADHD Diagnosis: How the Process Actually Works',
    excerpt: 'What actually happens during an ADHD diagnosis or assessment — who does it, how long it takes, and what to expect at each step.',
    date: 'September 23, 2026',
    readTime: '6 min read',
    topic: 'diagnosis-and-treatment',
    emoji: '📋',
  },
  {
    slug: 'adhd-medication-overview',
    title: 'ADHD Medication: A Plain-Language Overview',
    excerpt: 'A clear, non-clinical overview of how ADHD medication works and the main types available — not a substitute for medical advice.',
    date: 'September 25, 2026',
    readTime: '6 min read',
    topic: 'diagnosis-and-treatment',
    emoji: '💊',
  },
  {
    slug: 'adhd-and-autism-audhd',
    title: 'ADHD and Autism: Understanding AuDHD',
    excerpt: 'ADHD and autism overlap far more often than people realize. Here\'s what AuDHD actually looks like, and why it\'s so easy to miss.',
    date: 'September 27, 2026',
    readTime: '6 min read',
    topic: 'co-occurring-and-sensory',
    emoji: '🔗',
  },
  {
    slug: 'adult-adhd',
    title: 'Adult ADHD: What It Looks Like and What to Do About It',
    excerpt: 'Adult ADHD rarely looks like the childhood version. Here\'s what it actually looks like once you\'re the one paying the bills and running your own life.',
    date: 'September 29, 2026',
    readTime: '6 min read',
    topic: 'who-has-adhd',
    emoji: '💼',
  },
  {
    slug: 'adhd-types',
    title: 'The 3 Types of ADHD Explained',
    excerpt: 'Inattentive, hyperactive-impulsive, or combined — the three types of ADHD look genuinely different. Here\'s how to tell which fits you.',
    date: 'October 1, 2026',
    readTime: '6 min read',
    topic: 'adhd-basics',
    emoji: '🧩',
  },
  {
    slug: 'is-adhd-curable',
    title: 'Is ADHD Curable? Here\'s the Honest Answer',
    excerpt: 'Is ADHD curable? Not in the way people usually mean by that question — and understanding why actually changes what "getting better" looks like.',
    date: 'October 3, 2026',
    readTime: '5 min read',
    topic: 'diagnosis-and-treatment',
    emoji: '🔍',
  },
  {
    slug: 'is-adhd-hereditary',
    title: 'Is ADHD Hereditary? What the Research Actually Shows',
    excerpt: 'Is ADHD hereditary or genetic? Yes, more than almost any other condition of its kind — here\'s what that actually means for families.',
    date: 'October 5, 2026',
    readTime: '5 min read',
    topic: 'adhd-basics',
    emoji: '🧬',
  },
  {
    slug: 'adhd-in-children',
    title: 'ADHD in Children: Signs, Support, and What Helps',
    excerpt: 'What ADHD in children actually looks like beyond the "can\'t sit still" stereotype, and practical ways parents and teachers can help.',
    date: 'October 7, 2026',
    readTime: '6 min read',
    topic: 'who-has-adhd',
    emoji: '🎒',
  },
  {
    slug: 'high-functioning-adhd',
    title: 'High-Functioning ADHD: When "Doing Fine" Costs More Than It Looks Like',
    excerpt: 'High-functioning ADHD isn\'t a clinical category — it\'s a survival strategy. Here\'s what it actually costs, and why it often gets missed for years.',
    date: 'October 9, 2026',
    readTime: '6 min read',
    topic: 'adhd-basics',
    emoji: '🎭',
  },
  {
    slug: 'adhd-and-ocd',
    title: 'ADHD and OCD: How They Overlap (and How They Don\'t)',
    excerpt: 'ADHD and OCD can look surprisingly similar from the outside, and sometimes show up in the same person. Here\'s how to tell them apart.',
    date: 'October 11, 2026',
    readTime: '6 min read',
    topic: 'co-occurring-and-sensory',
    emoji: '🔁',
  },
  {
    slug: 'adhd-right-to-choose-uk',
    title: 'ADHD Right to Choose: What It Means in the UK',
    excerpt: 'Right to Choose can shorten an ADHD assessment wait in the UK — but 2026 demand has changed what to actually expect. Here\'s the current picture.',
    date: 'October 13, 2026',
    readTime: '7 min read',
    topic: 'diagnosis-and-treatment',
    emoji: '🇬🇧',
  },
]

export type Article = (typeof articles)[number]

/**
 * The articles visible to the public right now, in the original order.
 *
 * Every listing meant for visitors or crawlers — the blog index, the sitemap,
 * related articles — goes through this instead of reading `articles` directly,
 * so a future listing cannot forget the publish check.
 */
export function publishedArticles(now: number = Date.now()): Article[] {
  return articles.filter(a => isPublished(a.date, now))
}

const ARTICLE_HREF_RE = /^\/blog\/([a-z0-9-]+)$/

/**
 * Whether a link target is safe to render as a real link right now.
 *
 * In-body prose links are authored as `/blog/<slug>` and point at sibling
 * articles, some of which are scheduled for a later date. A live article
 * linking to one of those would send readers to a page that is deliberately
 * not published yet, and would leak its existence and title. Such links render
 * as plain text until the target is due.
 *
 * Anything that is not an article link — an external URL, mailto:, /shop — and
 * any slug not in the catalogue is left alone: this gates scheduled articles,
 * it is not a general link checker, and silently swallowing an unknown link
 * would hide a typo rather than surface it.
 */
export function isArticleHrefPublished(href: string, now: number = Date.now()): boolean {
  const m = ARTICLE_HREF_RE.exec(href)
  if (!m) return true
  const target = articles.find(a => a.slug === m[1])
  if (!target) return true
  return isPublished(target.date, now)
}

/**
 * The topic an article belongs to.
 *
 * Throws on an unknown slug rather than falling back. This is a developer typo,
 * not content data — unlike an unparseable publish date, silently degrading
 * here would hide a broken hub link behind a plausible-looking page.
 */
export function topicOf(article: Article): Topic {
  const topic = topicBySlug(article.topic)
  if (!topic) throw new Error(`Unknown topic "${article.topic}" on article "${article.slug}"`)
  return topic
}

/** Published articles in a topic, in catalogue order. */
export function publishedArticlesInTopic(topicSlug: TopicSlug | string, now: number = Date.now()): Article[] {
  return publishedArticles(now).filter(a => a.topic === topicSlug)
}

/**
 * Related articles for the bottom of an article page.
 *
 * Same-topic first, topped up from other topics. Two properties matter and pull
 * against each other: suggestions should be topically relevant, and every
 * article should receive a roughly equal number of inbound links so none is
 * orphaned.
 *
 * Splitting the old two tags into eight topics broke the plain rotation that
 * used to balance this: small topics all started their fallback at the same
 * point in the same list, so three articles ended up with no inbound links at
 * all while others collected eight. Same-topic picks still rotate, but the
 * fallback now goes to whichever eligible article currently has the fewest
 * inbound links, with catalogue order as the tie-break. That restores the
 * balance (2-4 inbound each, no orphans) and keeps 86% of suggestions on topic.
 *
 * The whole assignment is computed at once because a single article's fallback
 * depends on what every other article has already taken. It is deterministic,
 * so every page and every build agrees.
 */
function buildRelatedMap(live: Article[], count: number): Map<string, Article[]> {
  // Every article hands out `count` links and there are `live.length` articles,
  // so a perfectly even assignment gives each article exactly `count` inbound
  // links. That evenness matters — it is what stops a handful of articles
  // absorbing most of the internal link equity — and a greedy "pick the
  // least-linked peer" pass does not guarantee it: the articles processed last
  // find every good peer already full.
  //
  // A cyclic assignment does guarantee it: walk a ring and take the next
  // `count` entries, and every entry is taken exactly `count` times, by
  // construction. So the precision comes from choosing the rings rather than
  // from the picking.
  //
  // One ring per topic keeps every suggestion inside the topic, but a ring
  // needs more than `count` members to hand out `count` distinct links. Topics
  // still filling up under the publishing schedule are merged into the next
  // ring until they clear that bar, so a three-article topic borrows its
  // neighbours instead of producing duplicate or self-referential suggestions.
  const order = new Map(articles.map((a, i) => [a.slug, i]))
  // Topic order is fixed by the taxonomy, so buckets are built by walking it
  // rather than by iterating a Map (this tsconfig has no `target`, so Map
  // iteration would need downlevelIteration).
  const topicOrder = topics.map(t => t.slug) as readonly string[]
  const extras = live.map(a => a.topic).filter(t => !topicOrder.includes(t))
  const buckets: Article[][] = topicOrder
    .concat(extras.filter((t, i) => extras.indexOf(t) === i))
    .map(slug =>
      live
        .filter(a => a.topic === slug)
        .sort((x, y) => order.get(x.slug)! - order.get(y.slug)!))

  const rings: Article[][] = []
  let pending: Article[] = []
  for (const bucket of buckets) {
    if (!bucket.length) continue
    pending = pending.concat(bucket)
    if (pending.length > count) {
      rings.push(pending)
      pending = []
    }
  }
  // A leftover too small to stand alone joins the previous ring rather than
  // forming a short one; with no previous ring the whole set is the ring.
  if (pending.length) {
    if (rings.length) rings[rings.length - 1] = rings[rings.length - 1].concat(pending)
    else rings.push(pending)
  }

  const result = new Map<string, Article[]>()
  for (const ring of rings) {
    const n = ring.length
    for (let i = 0; i < n; i++) {
      const picked: Article[] = []
      for (let step = 1; step <= count && step < n; step++) picked.push(ring[(i + step) % n])
      result.set(ring[i].slug, picked)
    }
  }
  return result
}

let relatedCache: { key: string; count: number; map: Map<string, Article[]> } | null = null

export function relatedArticles(slug: string, count = 3): Article[] {
  const live = publishedArticles()
  // The assignment depends only on which articles are live, so it is rebuilt
  // when the publishing schedule moves and reused across pages otherwise.
  const key = live.map(a => a.slug).join(',')
  if (!relatedCache || relatedCache.key !== key || relatedCache.count !== count) {
    relatedCache = { key, count, map: buildRelatedMap(live, count) }
  }
  const hit = relatedCache.map.get(slug)
  if (hit) return hit

  // An unpublished article reached by direct URL is not in the assignment;
  // give it same-topic-first suggestions without disturbing the balance.
  const current = articles.find(a => a.slug === slug)
  if (!current) return []
  const sameTopic = live.filter(a => a.topic === current.topic)
  const others = live.filter(a => a.topic !== current.topic)
  return [...sameTopic, ...others].slice(0, count)
}
