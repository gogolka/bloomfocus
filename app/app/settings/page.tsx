'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabaseBrowser as supabase } from '@/lib/supabaseBrowser'

const C = {
  text: '#2D2926', mid: '#6B5F58', soft: '#9B8F88',
  lav: '#E8DEFF', purple: '#7B5FCC', purpleSoft: '#B8A4E8',
  cream: '#FFF8F0', card: '#FEFCFA', peach: '#FFD6C4', green: '#7FB069',
}

const PRO_BENEFITS = [
  ['✨', 'AI that does the hard parts', 'Break a task into tiny steps, sort your brain dump, suggest rewards.'],
  ['📊', 'Full insights & history', 'All-time trends and patterns, not just the last two weeks.'],
  ['🔥', 'Streak freeze', 'Skip a day without losing your streak.'],
  ['🌸', 'More plants, garden & themes', 'Extra plant types, garden views and app colour themes — added regularly.'],
  ['📔', 'All printables included', 'Every planner and tracker from the shop, plus new drops.'],
  ['🛠️', 'Power features', 'Recurring tasks, timer presets and data export.'],
]

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [uid, setUid] = useState<string | null>(null)
  const [isPro, setIsPro] = useState(false)
  const [proUntil, setProUntil] = useState<string | null>(null)
  const [subStatus, setSubStatus] = useState<string | null>(null)
  const [cancelling, setCancelling] = useState(false)
  const [cancelMsg, setCancelMsg] = useState('')
  const [plantName, setPlantName] = useState('')
  const [savedName, setSavedName] = useState('')
  const [savingName, setSavingName] = useState(false)
  const [nameMsg, setNameMsg] = useState('')
  const [frozenUntil, setFrozenUntil] = useState<string | null>(null)
  const [upgrading, setUpgrading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual')
  const [freezeBusy, setFreezeBusy] = useState(false)

  useEffect(() => { load() }, [])

  async function load() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }
    setUid(user.id)
    setEmail(user.email || '')
    const [profile, plant, sub] = await Promise.all([
      supabase.from('profiles').select('is_pro, pro_until').eq('id', user.id).single(),
      supabase.from('user_plant').select('plant_name').eq('user_id', user.id).single(),
      supabase.from('subscriptions').select('status, current_period_end').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
    ])
    setIsPro(!!profile.data?.is_pro)
    setProUntil(profile.data?.pro_until || null)
    setSubStatus(sub.data?.status || null)
    const pn = plant.data?.plant_name || 'My Brain Plant'
    setPlantName(pn); setSavedName(pn)
    const { data: xpRow } = await supabase.from('user_xp').select('streak_frozen_until').eq('user_id', user.id).single()
    setFrozenUntil(xpRow?.streak_frozen_until || null)
    setLoading(false)
  }

  async function activateFreeze() {
    if (!uid) return
    setFreezeBusy(true)
    const until = new Date(); until.setDate(until.getDate() + 14)
    const iso = until.toISOString().split('T')[0]
    const { error } = await supabase.from('user_xp').update({ streak_frozen_until: iso }).eq('user_id', uid)
    if (!error) setFrozenUntil(iso)
    setFreezeBusy(false)
  }

  async function cancelFreeze() {
    if (!uid) return
    setFreezeBusy(true)
    const { error } = await supabase.from('user_xp').update({ streak_frozen_until: null }).eq('user_id', uid)
    if (!error) setFrozenUntil(null)
    setFreezeBusy(false)
  }

  async function savePlantName() {
    if (!uid || !plantName.trim() || plantName.trim() === savedName) return
    setSavingName(true); setNameMsg('')
    const { error } = await supabase.from('user_plant').update({ plant_name: plantName.trim() }).eq('user_id', uid)
    if (!error) { setSavedName(plantName.trim()); setNameMsg('Saved ✓') }
    else setNameMsg('Could not save')
    setSavingName(false)
    setTimeout(() => setNameMsg(''), 2000)
  }

  async function exportData() {
    if (!uid) return
    const [tasks, habits, dumps] = await Promise.all([
      supabase.from('tasks').select('title, status, steps, tags, due_date, created_at, completed_at').eq('user_id', uid),
      supabase.from('habits').select('title, emoji, is_active, created_at').eq('user_id', uid),
      supabase.from('brain_dumps').select('content, created_at').eq('user_id', uid),
    ])
    const payload = {
      exportedAt: new Date().toISOString(),
      tasks: tasks.data || [],
      habits: habits.data || [],
      brainDumps: dumps.data || [],
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bloom-focus-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a); a.click(); a.remove()
    URL.revokeObjectURL(url)
  }

  async function handleUpgrade() {
    if (!email || upgrading) return
    setUpgrading(true)
    try {
      const slug = selectedPlan === 'annual' ? 'pro-annual' : 'pro-monthly'
      const res = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug: slug, customerEmail: email, lang: 'en' }),
      })
      const data = await res.json()
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        alert('Payment error: ' + (data.error || 'Unknown error'))
      }
    } catch (e) {
      alert('Something went wrong. Please try again.')
    } finally {
      setUpgrading(false)
    }
  }

  async function handleCancel() {
    if (cancelling) return
    const confirmed = window.confirm('Cancel your subscription? You\'ll keep Pro access until the end of your current billing period.')
    if (!confirmed) return
    setCancelling(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${session?.access_token}` },
      })
      const data = await res.json()
      if (data.ok) {
        setSubStatus('cancelled')
        setCancelMsg(data.message)
      } else {
        alert(data.error || 'Something went wrong')
      }
    } catch {
      alert('Something went wrong. Please try again.')
    } finally {
      setCancelling(false)
    }
  }

  const card: React.CSSProperties = { background: C.card, border: '1px solid rgba(45,41,38,0.08)', borderRadius: 20, padding: '20px', marginBottom: 16 }
  const labelStyle: React.CSSProperties = { fontSize: 11, color: C.soft, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }

  if (loading) return <div style={{ textAlign: 'center', padding: '60px 0', fontSize: 32 }}>⚙️</div>

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <Link href="/app" style={{ textDecoration: 'none', color: C.soft, fontSize: 20 }}>←</Link>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 26, color: C.text, margin: 0 }}>Settings</h1>
      </div>

      {/* Account */}
      <div style={card}>
        <div style={labelStyle}>Account</div>
        <div style={{ fontSize: 14, color: C.text, marginBottom: 16 }}>{email || '—'}</div>
        <button
          onClick={() => supabase.auth.signOut()}
          style={{ background: 'transparent', border: `1.5px solid ${C.lav}`, color: C.purple, borderRadius: 100, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
        >
          Sign out
        </button>
      </div>

      {/* Plant */}
      <div style={card}>
        <div style={labelStyle}>Your plant's name</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={plantName}
            onChange={e => setPlantName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && savePlantName()}
            maxLength={40}
            style={{ flex: 1, minWidth: 0, border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: C.text, background: C.cream, outline: 'none', fontFamily: "'DM Sans', sans-serif" }}
          />
          <button
            onClick={savePlantName}
            disabled={savingName || !plantName.trim() || plantName.trim() === savedName}
            style={{ background: plantName.trim() && plantName.trim() !== savedName ? C.purpleSoft : C.lav, color: plantName.trim() && plantName.trim() !== savedName ? 'white' : C.purple, border: 'none', borderRadius: 10, padding: '0 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            Save
          </button>
        </div>
        {nameMsg && <div style={{ fontSize: 12, color: nameMsg.includes('✓') ? C.green : '#c0627a', marginTop: 8 }}>{nameMsg}</div>}
      </div>

      {/* Export */}
      <div style={card}>
        <div style={labelStyle}>Your data</div>
        <div style={{ fontSize: 13, color: C.mid, marginBottom: 14, lineHeight: 1.5 }}>Download everything you've created — tasks, habits and brain dumps — as a file you keep.</div>
        <button
          onClick={exportData}
          style={{ background: 'transparent', border: `1.5px solid ${C.lav}`, color: C.purple, borderRadius: 100, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
        >
          Export my data ⬇
        </button>
      </div>

      {/* Streak freeze */}
      <div style={card}>
        <div style={labelStyle}>Streak freeze</div>
        {frozenUntil && Date.parse(frozenUntil) >= Date.parse(new Date().toISOString().split('T')[0]) ? (
          <>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: 14, lineHeight: 1.5 }}>Your streak is protected until {new Date(frozenUntil).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}. Take the time you need — missed days in this window won't break it.</div>
            <button onClick={cancelFreeze} disabled={freezeBusy} style={{ background: 'transparent', border: `1.5px solid ${C.lav}`, color: C.purple, borderRadius: 100, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              Cancel freeze
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 13, color: C.mid, marginBottom: 14, lineHeight: 1.5 }}>Going away or having a hard stretch? Freeze your streak for two weeks so a few missed days don't reset it.</div>
            <button onClick={activateFreeze} disabled={freezeBusy} style={{ background: C.purpleSoft, border: 'none', color: 'white', borderRadius: 100, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
              {freezeBusy ? 'Saving…' : 'Freeze my streak (14 days) ❄️'}
            </button>
          </>
        )}
      </div>

      {/* Garden link */}
      <Link href="/app/garden" style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 14, color: C.text, fontWeight: 600 }}>Your garden 🌷</div>
            <div style={{ fontSize: 12, color: C.soft }}>See your blooms and change your plant's style.</div>
          </div>
          <span style={{ color: C.purple, fontSize: 18 }}>→</span>
        </div>
      </Link>

      {/* Printables library link */}
      <Link href="/app/library" style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{ ...card, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 14, color: C.text, fontWeight: 600 }}>Printables library 📔</div>
            <div style={{ fontSize: 12, color: C.soft }}>Download the printables included with Pro.</div>
          </div>
          <span style={{ color: C.purple, fontSize: 18 }}>→</span>
        </div>
      </Link>

      {/* Pro */}
      <div style={{ ...card, background: 'linear-gradient(150deg, #F3EEFF, #FFF3EC)', border: '1px solid rgba(123,95,204,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: C.text }}>bloom focus <em style={{ color: C.purple }}>Pro</em></span>
          {isPro && <span style={{ fontSize: 11, background: C.purple, color: 'white', borderRadius: 100, padding: '4px 10px', fontWeight: 600 }}>ACTIVE</span>}
        </div>

        {isPro ? (
          <div>
            <div style={{ fontSize: 14, color: C.mid, marginBottom: 12 }}>You have full access to everything. Thank you for supporting bloom focus 💜</div>
            {proUntil && (
              <div style={{ fontSize: 12, color: C.soft, marginBottom: 12 }}>
                {subStatus === 'cancelled'
                  ? `Access until ${new Date(proUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
                  : `Renews ${new Date(proUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`
                }
              </div>
            )}
            {cancelMsg && <div style={{ fontSize: 12, color: C.green, marginBottom: 12 }}>{cancelMsg}</div>}
            {subStatus === 'active' && (
              <button
                onClick={handleCancel}
                disabled={cancelling}
                style={{ background: 'transparent', border: '1px solid rgba(45,41,38,0.15)', color: C.soft, borderRadius: 100, padding: '8px 16px', fontSize: 12, cursor: 'pointer' }}
              >
                {cancelling ? 'Cancelling…' : 'Cancel subscription'}
              </button>
            )}
            {subStatus === 'cancelled' && (
              <div style={{ fontSize: 12, color: C.soft, fontStyle: 'italic' }}>Subscription cancelled — no further charges.</div>
            )}
          </div>
        ) : (
          <div style={{ fontSize: 14, color: C.mid, marginBottom: 16 }}>Right now everything here is free while we're in early access. Paid plans are coming soon — here's what Pro will include.</div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 18 }}>
          {PRO_BENEFITS.map(([emoji, title, desc], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{emoji}</span>
              <div>
                <div style={{ fontSize: 14, color: C.text, fontWeight: 600 }}>{title}</div>
                <div style={{ fontSize: 12, color: C.soft, lineHeight: 1.5 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {!isPro && (
          <>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <div
                onClick={() => setSelectedPlan('monthly')}
                style={{ flex: 1, background: selectedPlan === 'monthly' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)', borderRadius: 14, padding: '14px', textAlign: 'center', border: selectedPlan === 'monthly' ? `1.5px solid ${C.purpleSoft}` : '1px solid rgba(123,95,204,0.15)', cursor: 'pointer' }}>
                <div style={{ fontSize: 11, color: C.soft, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Monthly</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: C.text }}>$1.99</div>
                <div style={{ fontSize: 10, color: C.soft }}>per month</div>
              </div>
              <div
                onClick={() => setSelectedPlan('annual')}
                style={{ flex: 1, background: selectedPlan === 'annual' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)', borderRadius: 14, padding: '14px', textAlign: 'center', border: selectedPlan === 'annual' ? `1.5px solid ${C.purpleSoft}` : '1px solid rgba(123,95,204,0.15)', cursor: 'pointer', position: 'relative' }}>
                <div style={{ fontSize: 11, color: C.purple, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Annual</div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: C.text }}>$19.99</div>
                <div style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>save 16%</div>
              </div>
            </div>
            <button
              onClick={handleUpgrade}
              disabled={upgrading}
              style={{ width: '100%', background: upgrading ? C.lav : C.purple, color: 'white', border: 'none', borderRadius: 100, padding: '13px', fontSize: 14, fontWeight: 600, cursor: upgrading ? 'default' : 'pointer', transition: 'background 0.2s' }}
            >
              {upgrading ? 'Preparing payment…' : `Upgrade to Pro — $${selectedPlan === 'annual' ? '19.99/year' : '1.99/month'}`}
            </button>
          </>
        )}
      </div>

      <p style={{ fontSize: 11, color: C.soft, textAlign: 'center', lineHeight: 1.6, marginTop: 4 }}>
        bloom focus · made gently for ADHD brains
      </p>
    </div>
  )
}
