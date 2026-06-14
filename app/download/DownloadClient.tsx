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
  const [hasLowink, setHasLowink] = useState(false)
  const [downloading, setDownloading] = useState<string | null>(null) // 'colour' | 'lowink'

  useEffect(() => {
    if (!token) { setState('error'); return }

    fetch(`/api/poster-langs?token=${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.multilingual && data.langs.length > 0) {
          setLangs(data.langs)
          setOrderLang(data.orderLang || 'en')
          setSelectedLang(data.orderLang || data.langs[0])
          setHasLowink(data.hasLowink || false)
          setState('ready')
        } else {
          setState('simple')
          window.location.href = `/api/download?token=${token}`
        }
      })
      .catch(() => setState('error'))
  }, [token])

  function handleDownload(variant: 'colour' | 'lowink') {
    if (!token || !selectedLang) return
    setDownloading(variant)
    window.location.href = `/api/download?token=${token}&lang=${selectedLang}&variant=${variant}`
    setTimeout(() => setDownloading(null), 3000)
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

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 8 }}>
            bloom <em style={{ color: '#B8A4E8' }}>focus</em>
          </div>
          <div style={{ fontSize: 32, marginBottom: 12 }}>✨</div>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926', marginBottom: 8 }}>Your file is ready</h1>
          <p style={{ color: '#6B5F58', fontSize: 14, lineHeight: 1.6 }}>
            Choose your language and version.
          </p>
        </div>

        {/* Language selector */}
        {langs.length > 1 && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 12, color: '#9B8F88', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Language</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {langs.map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedLang(lang)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
                    border: selectedLang === lang ? '2px solid #B8A4E8' : '1.5px solid rgba(45,41,38,0.12)',
                    background: selectedLang === lang ? '#F5F0FF' : 'white',
                    color: '#2D2926', fontSize: 15,
                  }}
                >
                  <span>{LANG_LABELS[lang] || lang.toUpperCase()}</span>
                  <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {lang === orderLang && (
                      <span style={{ fontSize: 11, color: '#9B8F88', background: '#E8DEFF', borderRadius: 100, padding: '2px 10px' }}>
                        your language
                      </span>
                    )}
                    {selectedLang === lang && <span style={{ color: '#B8A4E8' }}>✓</span>}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Download buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Colour version */}
          <button
            onClick={() => handleDownload('colour')}
            disabled={!selectedLang || downloading === 'colour'}
            style={{
              width: '100%', padding: '15px', borderRadius: 100, border: 'none', cursor: 'pointer',
              background: downloading === 'colour' ? '#D4C5F9' : '#B8A4E8',
              color: 'white', fontSize: 15, fontWeight: 600,
            }}
          >
            {downloading === 'colour' ? '⏳ Downloading…' : '🎨 Download Colour version'}
          </button>

          {/* Low-ink version — show only if available */}
          {hasLowink && (
            <button
              onClick={() => handleDownload('lowink')}
              disabled={!selectedLang || downloading === 'lowink'}
              style={{
                width: '100%', padding: '15px', borderRadius: 100, border: '1.5px solid #B8A4E8', cursor: 'pointer',
                background: downloading === 'lowink' ? '#F0EBFF' : 'white',
                color: '#7B5FCC', fontSize: 15, fontWeight: 600,
              }}
            >
              {downloading === 'lowink' ? '⏳ Downloading…' : '🖨️ Download Low-ink version'}
            </button>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#9B8F88', marginTop: 16, lineHeight: 1.5 }}>
          You can download both versions. Link valid for 7 days.
        </p>
      </div>
    </div>
  )
}
