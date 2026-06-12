'use client'
import { useEffect, useState } from 'react'

// Registers the service worker and surfaces a native "Install app" button when
// the browser reports the app is installable. Hidden once installed or when the
// browser can't install (e.g. iOS Safari, which uses Share → Add to Home Screen).
export default function InstallButton() {
  const [deferred, setDeferred] = useState<any>(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as any).standalone === true
    if (standalone) setInstalled(true)

    const onPrompt = (e: any) => { e.preventDefault(); setDeferred(e) }
    const onInstalled = () => { setInstalled(true); setDeferred(null) }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  async function install() {
    if (!deferred) return
    deferred.prompt()
    try { await deferred.userChoice } catch { /* ignore */ }
    setDeferred(null)
  }

  if (installed || !deferred) return null
  return (
    <button onClick={install} style={{ background: '#B8A4E8', color: 'white', border: 'none', borderRadius: 100, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' }}>
      Install app ⬇
    </button>
  )
}
