'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const LANG_LABELS: Record<string, string> = {
  en: '🇬🇧 English',
  de: '🇩🇪 Deutsch',
  fr: '🇫🇷 Français',
  es: '🇪🇸 Español',
}

export default function DownloadClient() {
  const params = useSearchParams()
  const token = params.get('token')
  const [state, setState] = useState<'loading' | 'ready' | 'simple' | 'error'>('loading')
  const [langs, setLangs] = useState<string[]>([])
  const [orderLang, setOrderLang] = useState('en')
  const [selectedLang, setSelectedLang] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (!token) { setState('error'); return }

    fetch(`/api/poster-langs?token=${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.multilingual && data.langs.length > 1) {
          setLangs(data.langs)
          setOrderLang(data.orderLang || 'en')
          setSelectedLang(data.orderLang || data.langs[0])
          setState('ready')
        } else {
          setState('simple')
          window.location.href = `/api/download?token=${token}`
        }
      })
      .catch(() => setState('error'))
  }, [token])

  function handleDownload() {
    if (!token || !selectedLang) return
    setDownloading(true)
    window.location.href = `/api/download?token=${token}&lang=${selectedLang}`
    setTimeout(() => setDownloading(false), 3000)
  }

  if (state === 'loading' || state === 'simple') {
    return (
      <div style={{ minHeight: '100vh', background: '#FFF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🌸</div>
          <p style={{ color: '#6B5F58', fontFamily: 'Georgia, serif' }}>Preparing your download…</p>
        </div>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div style={{ minHeight: '100vh', background: '#FFF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 400, padding: '0 24px' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>💜</div>
          <h1 style={{ fontFamily: 'Georgia, serif', color: '#2D2926', marginBottom: 12 }}>Link not found</h1>
          <p style={{ color: '#6B5F58', lineHeight: 1.6 }}>This download link may have expired or already been used. Check your email or contact support.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: 480, width: '100%', background: 'white', borderRadius: 24, padding: '40px 32px', border: '1.5px solid rgba(184,164,232,0.3)', boxShadow: '0 4px 24px rgba(123,95,204,0.08)' }}>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 8 }}>
            bloom <em style={{ color: '#B8A4E8' }}>focus</em>
          </div>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✨</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 8 }}>Your poster is ready</h1>
          <p style={{ color: '#6B5F58', fontSize: 14, lineHeight: 1.6 }}>
            Choose your language — you can download all versions.
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 12, color: '#9B8F88', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Select language</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {langs.map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
                  border: selectedLang === lang ? '2px solid #B8A4E8' : '1.5px solid rgba(45,41,38,0.12)',
                  background: selectedLang === lang ? '#F5F0FF' : 'white',
                  color: '#2D2926', fontSize: 15, fontWeight: selectedLang === lang ? 500 : 400,
                  transition: 'all 0.15s',
                }}
              >
                <span>{LANG_LABELS[lang] || lang.toUpperCase()}</span>
                {lang === orderLang && (
                  <span style={{ fontSize: 11, color: '#9B8F88', background: '#E8DEFF', borderRadius: 100, padding: '2px 10px' }}>
                    your language
                  </span>
                )}
                {selectedLang === lang && <span style={{ color: '#B8A4E8', fontSize: 18 }}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleDownload}
          disabled={!selectedLang || downloading}
          style={{
            width: '100%', padding: '16px', borderRadius: 100, border: 'none', cursor: 'pointer',
            background: downloading ? '#D4C5F9' : '#B8A4E8',
            color: 'white', fontSize: 16, fontWeight: 600,
            transition: 'background 0.2s',
          }}
        >
          {downloading ? '⏳ Downloading…' : `⬇️ Download ${selectedLang ? LANG_LABELS[selectedLang]?.split(' ')[1] || '' : ''}`}
        </button>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#9B8F88', marginTop: 16, lineHeight: 1.5 }}>
          You can download each language separately. Link valid for 7 days.
        </p>
      </div>
    </div>
  )
}
