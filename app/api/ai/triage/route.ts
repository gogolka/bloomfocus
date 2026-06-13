import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Pro AI feature: take a messy brain dump and pull out concrete tasks + the
// single best next action. Server-side only.
export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json()
    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json({ error: 'Nothing to sort yet' }, { status: 400 })
    }

    const key = (process.env.ANTHROPIC_API_KEY || '').replace(/[^\x21-\x7E]/g, '')
    if (!key) {
      return NextResponse.json({ error: 'AI is not set up yet', notConfigured: true }, { status: 503 })
    }

    const system = [
      'You help people with ADHD make sense of a messy brain dump.',
      'Read the dump and pull out concrete, actionable tasks — short, verb-first, one action each.',
      'Ignore feelings, venting, and vague notes that are not actions.',
      'Then pick the single easiest task to start with right now.',
      'Respond with ONLY valid JSON in this exact shape, no preamble:',
      '{"tasks":["..."],"nextAction":"..."}',
    ].join(' ')

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system,
        messages: [{ role: 'user', content: content.slice(0, 4000) }],
      }),
    })

    if (!resp.ok) {
      const detail = await resp.text()
      console.error('ai/triage anthropic error', resp.status, detail)
      return NextResponse.json({ error: 'AI could not respond right now', detail: `${resp.status}: ${detail.slice(0, 300)}` }, { status: 502 })
    }

    const data = await resp.json()
    const text: string = (data.content || []).filter((b: any) => b.type === 'text').map((b: any) => b.text).join('').trim()
    const cleaned = text.replace(/```json/gi, '').replace(/```/g, '').trim()

    let tasks: string[] = []
    let nextAction = ''
    try {
      const parsed = JSON.parse(cleaned)
      if (Array.isArray(parsed.tasks)) tasks = parsed.tasks.map((s: any) => String(s)).filter(Boolean).slice(0, 12)
      if (parsed.nextAction) nextAction = String(parsed.nextAction)
    } catch {
      tasks = cleaned.split('\n').map(l => l.replace(/^[\s\-*•\d.)]+/, '').trim()).filter(Boolean).slice(0, 12)
    }

    if (tasks.length === 0) {
      return NextResponse.json({ error: 'No clear tasks found — that\'s okay, not everything is a to-do' }, { status: 422 })
    }

    return NextResponse.json({ tasks, nextAction })
  } catch (e: any) {
    console.error('ai/triage threw', e?.message)
    return NextResponse.json({ error: 'Something went wrong', detail: e?.message || String(e) }, { status: 500 })
  }
}
