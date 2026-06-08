'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null as any
  return createClient(url, key)
})()

export default function DumpPage() {
  const [content, setContent] = useState('')
  const [dumps, setDumps] = useState<any[]>([])
  const [xpToast, setXpToast] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) { setUserId(user.id); loadDumps(user.id) }
    })
  }, [])

  async function loadDumps(uid: string) {
    const { data } = await supabase.from('brain_dumps').select('*').eq('user_id', uid).order('created_at', { ascending: false }).limit(10)
    setDumps(data || [])
  }

  async function saveDump() {
    if (!content.trim() || !userId) return
    const { data } = await supabase.from('brain_dumps').insert({ user_id: userId, content: content.trim() }).select().single()
    if (data) {
      setDumps(prev => [data, ...prev])
      setContent('')
      setXpToast('+20 XP 🧠 Brain unloaded!')
      setTimeout(() => setXpToast(''), 2500)
    }
  }

  async function convertToTask(dump: any) {
    if (!userId) return
    const { data: task } = await supabase.from('tasks').insert({ user_id: userId, title: dump.content.substring(0, 100), steps: [], source: 'brain_dump' }).select().single()
    if (task) {
      await supabase.from('brain_dumps').update({ converted_task_id: task.id }).eq('id', dump.id)
      setDumps(prev => prev.map(d => d.id === dump.id ? { ...d, converted_task_id: task.id } : d))
    }
  }

  const words = content.trim().split(/\s+/).filter(Boolean).length

  return (
    <div>
      {xpToast && <div style={{ position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)', background: '#2D2926', color: 'white', padding: '10px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600, zIndex: 200, whiteSpace: 'nowrap' }}>{xpToast}</div>}

      <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 4 }}>Brain Dump</div>
      <div style={{ fontSize: 13, color: '#9B8F88', marginBottom: 20 }}>Empty your head. No judgment, no structure. +20 XP each dump 🧠</div>

      <div style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 16, padding: '16px', marginBottom: 20 }}>
        <textarea
          value={content} onChange={e => setContent(e.target.value)}
          placeholder={"Everything that's in your head right now…\nTasks, worries, ideas, random thoughts — let it all out."}
          style={{ width: '100%', border: 'none', resize: 'none', minHeight: 180, fontSize: 15, lineHeight: 1.8, color: '#2D2926', background: 'transparent', outline: 'none', fontFamily: "'DM Sans', sans-serif" }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          <span style={{ fontSize: 11, color: '#9B8F88' }}>{words} words</span>
          <button onClick={saveDump} style={{ background: '#B8A4E8', color: 'white', border: 'none', borderRadius: 100, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Save dump 🧠 (+20 XP)
          </button>
        </div>
      </div>

      {/* Previous dumps */}
      {dumps.length > 0 && (
        <div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: '#2D2926', marginBottom: 12 }}>Previous dumps</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {dumps.map(dump => (
              <div key={dump.id} style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, color: '#9B8F88', marginBottom: 8 }}>{new Date(dump.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                <div style={{ fontSize: 13, color: '#2D2926', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{dump.content.substring(0, 200)}{dump.content.length > 200 ? '…' : ''}</div>
                {!dump.converted_task_id && (
                  <button onClick={() => convertToTask(dump)} style={{ marginTop: 10, background: '#E8DEFF', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 11, color: '#7B5FCC', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                    → Convert to task
                  </button>
                )}
                {dump.converted_task_id && <div style={{ marginTop: 8, fontSize: 11, color: '#5BA85B' }}>✓ Converted to task</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
