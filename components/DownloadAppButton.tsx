'use client'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// Marketing-site install CTA.
// - Chrome / Android (supports the native prompt) -> fires the install prompt.
// - iPhone / iPad (Safari blocks programmatic install) -> shows step-by-step
//   "Add to Home Screen" instructions instead of navigating away.
// - Other browsers without prompt support -> shows generic instructions.
export default function DownloadAppButton({ variant = 'pill' }: { variant?: 'pill' | 'block' }) {
  const [deferred, setDeferred] = useState<any>(null)
  const [showHelp, setShowHelp] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
    const ua = navigator.userAgent || ''
    // iPadOS 13+ reports as Mac; also check touch points.
    const ios = /iphone|ipad|ipod/i.test(ua) || (/Macintosh/.test(ua) && 'ontouchend' in document)
    setIsIOS(ios)
    const onPrompt = (e: any) => { e.preventDefault(); setDeferred(e) }
    window.addEventListener('beforeinstallprompt', onPrompt)
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  async function handleClick() {
    if (deferred) {
      deferred.prompt()
      try { await deferred.userChoice } catch { /* ignore */ }
      setDeferred(null)
      return
    }
    setShowHelp(true)
  }

  const base: React.CSSProperties = {
    background: '#7B5FCC', color: 'white', border: 'none', cursor: 'pointer',
    fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
  }
  const style: React.CSSProperties = variant === 'block'
    ? { ...base, padding: '14px 28px', borderRadius: 100, fontSize: 15, width: '100%' }
    : { ...base, padding: '9px 18px', borderRadius: 100, fontSize: 13 }

  return (
    <>
      <button onClick={handleClick} style={style}>Download app ⬇</button>

      {showHelp && mounted && createPortal(
        <div
          onClick={e => { if (e.target === e.currentTarget) setShowHelp(false) }}
          style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(45,41,38,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
        >
          <div style={{ background: '#FEFCFA', borderRadius: 24, padding: '32px 28px', maxWidth: 380, width: '100%', boxShadow: '0 20px 60px rgba(45,41,38,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926' }}>Install bloom focus</div>
              <button onClick={() => setShowHelp(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#9B8F88', lineHeight: 1 }}>✕</button>
            </div>

            {isIOS ? (
              <>
                <div style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6, marginBottom: 18 }}>
                  iPhone installs apps from the browser share menu. It takes a few seconds:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    ['1', <>Tap the <strong>Share</strong> button at the bottom of Safari — the square with an arrow pointing up.</>],
                    ['2', <>Scroll down and tap <strong>Add to Home Screen</strong>.</>],
                    ['3', <>Tap <strong>Add</strong>. The bloom focus icon appears on your home screen, and it opens like a real app.</>],
                  ].map(([n, text]) => (
                    <div key={n as string} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: '#E8DEFF', color: '#7B5FCC', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
                      <div style={{ fontSize: 14, color: '#2D2926', lineHeight: 1.5 }}>{text}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: '#9B8F88', marginTop: 18, lineHeight: 1.5 }}>
                  Make sure you're in Safari — the option doesn't appear inside other apps' built-in browsers.
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6, marginBottom: 16 }}>
                  Your browser can install bloom focus as an app:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ fontSize: 14, color: '#2D2926', lineHeight: 1.5 }}>
                    On <strong>desktop Chrome or Edge</strong>, click the install icon in the address bar (a small screen with a down arrow), or open the menu and choose <strong>Install bloom focus</strong>.
                  </div>
                  <div style={{ fontSize: 14, color: '#2D2926', lineHeight: 1.5 }}>
                    On <strong>Android</strong>, open the browser menu (⋮) and tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#9B8F88', marginTop: 16, lineHeight: 1.5 }}>
                  If you don't see the option, the app may already be installed.
                </div>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
