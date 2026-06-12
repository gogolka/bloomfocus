'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Marketing-site install CTA. If the browser supports installing the PWA, it
// fires the native install prompt; otherwise it sends the visitor to the app
// (where they can sign in and add it to their home screen). Always visible.
export default function DownloadAppButton({ variant = 'pill' }: { variant?: 'pill' | 'block' }) {
  const [deferred, setDeferred] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
    const onPrompt = (e: any) => { e.preventDefault(); setDeferred(e) }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  async function handleClick() {
    if (deferred) {
      deferred.prompt()
      try { await deferred.userChoice } catch { /* ignore */ }
      setDeferred(null)
    } else {
      router.push('/app')
    }
  }

  const base: React.CSSProperties = {
    background: '#7B5FCC', color: 'white', border: 'none', cursor: 'pointer',
    fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  }
  const style: React.CSSProperties = variant === 'block'
    ? { ...base, padding: '14px 28px', borderRadius: 100, fontSize: 15 }
    : { ...base, padding: '9px 18px', borderRadius: 100, fontSize: 13 }

  return (
    <button onClick={handleClick} style={style}>
      Download app ⬇
    </button>
  )
}
