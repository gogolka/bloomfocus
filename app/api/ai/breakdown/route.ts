import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Pro AI feature: turn one overwhelming task into tiny, concrete first steps.
// Server-side only — the Anthropic key never reaches the browser.
export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json()
    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'Give me a task first' }, { status: 400 })
    }

    // Strip any stray non-printable/non-ASCII characters (e.g. U+2028 line
    // separators that copy-paste sometimes injects) — HTTP header values must
    // be ByteStrings (<= 255), so an invisible character here breaks the request.
    const key = (process.env.ANTHROPIC_API_KEY || '').replace(/[^\x21-\x7E]/g, '')
    if (!key) {
      // Graceful state until the key is set in Vercel.
      return NextResponse.json({ error: 'AI is not set up yet', notConfigured: true }, { status: 503 })
    }

    const system = [
      'You help people with ADHD start tasks they feel stuck on.',
      'Break the task into 3 to 6 tiny, concrete, physical first steps.',
      'Each step must be small enough to begin in under two minutes, start with a verb, and be specific to the task.',
      'No motivation, no encouragement, no preamble.',
      'Respond with ONLY a JSON array of short strings. Example: ["Open the document","Type the title"]',
    ].join(' ')

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system,
        messages: [{ role: 'user', content: `Task: ${title.trim()}` }],
      }),
    })

    if (!resp.ok) {
      const detail = await resp.text()
      console.error('ai/breakdown anthropic error', resp.status, detail)
      return NextResponse.json({ error: 'AI could not respond right now', detail: `${resp.status}: ${detail.slice(0, 300)}` }, { status: 502 })
    }

    const data = await resp.json()
    const text: string = (data.content || [])
      .filter((b: any) => b.type === 'text')
      .map((b: any) => b.text)
      .join('')
      .trim()

    let steps: string[] = []
    const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim()
    try {
      const parsed = JSON.parse(cleaned)
      if (Array.isArray(parsed)) steps = parsed.map(s => String(s)).filter(Boolean)
    } catch {
      // Fallback: split lines, strip bullets/numbering.
      steps = cleaned
        .split('\n')
        .map(l => l.replace(/^[\s\-*•\d.)]+/, '').trim())
        .filter(Boolean)
    }

    steps = steps.slice(0, 6)
    if (steps.length === 0) {
      return NextResponse.json({ error: 'AI could not break that down — try rephrasing' }, { status: 422 })
    }

    return NextResponse.json({ steps })
  } catch (e: any) {
    console.error('ai/breakdown threw', e?.message)
    return NextResponse.json({ error: 'Something went wrong', detail: e?.message || String(e) }, { status: 500 })
  }
}
