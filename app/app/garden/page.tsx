'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'
import { stageFromXP } from '@/lib/xp'
import { PLANT_STAGES } from '@/lib/gamification'
import { SKIN_LIST, skinEmoji } from '@/lib/skins'

const C = {
  text: '#2D2926', mid: '#6B5F58', soft: '#9B8F88',
  lav: '#E8DEFF', purple: '#7B5FCC', purpleSoft: '#B8A4E8',
  cream: '#FFF8F0', card: '#FEFCFA', green: '#7FB069',
}

export default function GardenPage() {
  const [loading, setLoading] = useState(true)
  const [uid, setUid] = useState<string | null>(null)
  const [plant, setPlant] = useState<any>(null)
  const [totalXP, setTotalXP] = useState(0)
  const [skin, setSkin] = useState('default')
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }
    setUid(user.id)
    const [xp, p] = await Promise.all([
      supabase.from('user_xp').select('total_xp').eq('user_id', user.id).single(),
      supabase.from('user_plant').select('plant_name, bloomed_count, xp_base, skin').eq('user_id', user.id).single(),
    ])
    setTotalXP(xp.data?.total_xp || 0)
    setPlant(p.data)
    setSkin(p.data?.skin || 'default')
    setLoading(false)
  }

  async function pickSkin(id: string) {
    if (!uid || id === skin) return
    setSkin(id); setSaving(true)
    await supabase.from('user_plant').update({ skin: id }).eq('user_id', uid)
    setSaving(false)
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '60px 0', fontSize: 32 }}>🌷</div>

  const plantXP = Math.max(0, totalXP - (plant?.xp_base || 0))
  const stageNum = stageFromXP(plantXP)
  const stageName = (PLANT_STAGES[stageNum as keyof typeof PLANT_STAGES] || PLANT_STAGES[1]).name
  const bloomed = plant?.bloomed_count || 0
  const bloomEmoji = skinEmoji(skin, 6)

  const card: React.CSSProperties = { background: C.card, border: '1px solid rgba(45,41,38,0.08)', borderRadius: 20, padding: '20px', marginBottom: 16 }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <Link href="/app" style={{ textDecoration: 'none', color: C.soft, fontSize: 20 }}>←</Link>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: C.text, margin: 0 }}>Your Garden</h1>
      </div>

      {/* Current plant */}
      <div style={{ ...card, textAlign: 'center', background: 'linear-gradient(160deg, #FFFDFB, #F6F1FF)' }}>
        <div style={{ fontSize: 84, lineHeight: 1, marginBottom: 8 }}>{skinEmoji(skin, stageNum)}</div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: C.text }}>{plant?.plant_name || 'My Brain Plant'}</div>
        <div style={{ fontSize: 12, color: C.soft, marginTop: 4 }}>Growing now · {stageName}</div>
      </div>

      {/* Bloomed garden */}
      <div style={card}>
        <div style={{ fontSize: 11, color: C.soft, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Flowers you've grown</div>
        {bloomed > 0 ? (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 30, lineHeight: 1.2 }}>
              {Array.from({ length: Math.min(bloomed, 60) }).map((_, i) => (
                <span key={i}>{bloomEmoji}</span>
              ))}
            </div>
            <div style={{ fontSize: 13, color: C.mid, marginTop: 12, lineHeight: 1.5 }}>
              You've brought {bloomed} plant{bloomed === 1 ? '' : 's'} to full bloom. Every one of them is a stretch of days you showed up for yourself.
            </div>
          </>
        ) : (
          <div style={{ fontSize: 13, color: C.soft, lineHeight: 1.6 }}>No full blooms yet — keep watering your plant, and when it reaches full bloom you can harvest it here and start a fresh seed.</div>
        )}
      </div>

      {/* Skin picker (Pro) */}
      <div style={{ ...card, marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: C.soft, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Plant style {saving && <span style={{ color: C.green, textTransform: 'none', letterSpacing: 0 }}>· saved</span>}</div>
        <div style={{ fontSize: 13, color: C.mid, marginBottom: 14, lineHeight: 1.5 }}>Choose how your plant looks. It changes the look only — your growth and progress stay exactly the same.</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {SKIN_LIST.map(s => {
            const active = s.id === skin
            return (
              <button key={s.id} onClick={() => pickSkin(s.id)} style={{ background: active ? C.lav : C.cream, border: `1.5px solid ${active ? C.purpleSoft : 'rgba(45,41,38,0.08)'}`, borderRadius: 14, padding: '12px 6px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 30, lineHeight: 1 }}>{s.stages[4]}</span>
                <span style={{ fontSize: 11, color: active ? C.purple : C.soft, fontWeight: active ? 600 : 400 }}>{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
