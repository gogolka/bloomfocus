'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Lang } from '@/lib/i18n'
import { buy } from '@/lib/i18n-shop'

interface BuyButtonProps {
  productSlug: string
  productTitle: string
  priceUsd: string
  lang?: Lang
}

export default function BuyButton({ productSlug, productTitle, priceUsd, lang = 'en' as Lang }: BuyButtonProps) {
  const t = buy[lang] || buy.en
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)
  const [promo, setPromo] = useState('')
  const [promoChecking, setPromoChecking] = useState(false)
  const [discountPercent, setDiscountPercent] = useState(0)
  const [promoMsg, setPromoMsg] = useState('')

  useEffect(() => { setMounted(true) }, [])

  const baseNum = parseFloat(priceUsd.replace(/[^0-9.]/g, '')) || 0
  const discountedNum = discountPercent > 0 ? baseNum * (100 - discountPercent) / 100 : baseNum
  const discountedDisplay = `$${discountedNum.toFixed(2)}`

  const applyPromo = async () => {
    if (!promo.trim()) return
    setPromoChecking(true)
    setPromoMsg('')
    try {
      const res = await fetch('/api/validate-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promo }),
      })
      const data = await res.json()
      if (data.valid) {
        setDiscountPercent(data.discountPercent || 0)
        setPromoMsg('')
      } else {
        setDiscountPercent(0)
        setPromoMsg(data.message || t.promoInvalid)
      }
    } catch {
      setPromoMsg(t.promoCheckErr)
    }
    setPromoChecking(false)
  }

  const handleBuy = async () => {
    if (!email || !email.includes('@')) {
      setError(t.invalidEmail)
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug,
          customerEmail: email,
          customerName: name,
          promoCode: discountPercent > 0 ? promo.trim() : undefined,
          lang,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.paymentUrl) {
        setError((data.error || t.genericError) + (data.detail ? `: ${data.detail}` : ''))
        setLoading(false)
        return
      }

      // Redirect to Monobank payment page
      window.location.href = data.paymentUrl

    } catch {
      setError(t.connError)
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{
          background: '#2D2926', color: 'white', border: 'none',
          padding: '12px 22px', borderRadius: 100, fontSize: 14,
          fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
          width: '100%',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#4a3f38')}
        onMouseLeave={e => (e.currentTarget.style.background = '#2D2926')}
      >
        {t.buyNow}
      </button>

      {showModal && mounted && createPortal(
        <div
          onClick={e => { if (e.target === e.currentTarget && !loading) setShowModal(false) }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(45,41,38,0.65)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div style={{
            background: '#FEFCFA', borderRadius: 24, padding: '36px 32px',
            maxWidth: 420, width: '100%',
            boxShadow: '0 20px 60px rgba(45,41,38,0.2)',
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{
                  width: 44, height: 44, margin: '0 auto 20px',
                  border: '3px solid #E8DEFF', borderTopColor: '#B8A4E8',
                  borderRadius: '50%', animation: 'bloomspin 0.8s linear infinite',
                }} />
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#2D2926', marginBottom: 6 }}>
                  {t.preparing}
                </div>
                <div style={{ fontSize: 13, color: '#9B8F88', lineHeight: 1.5 }}>
                  {t.preparingA}<br />{t.preparingB}
                </div>
                <style>{`@keyframes bloomspin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : (
            <>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 4 }}>
                  {productTitle}
                </div>
                <div style={{ fontSize: 13, color: '#9B8F88' }}>{t.enterEmail}</div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#9B8F88', lineHeight: 1 }}
              >✕</button>
            </div>

            {/* Price */}
            <div style={{ background: '#E8DEFF', borderRadius: 12, padding: '12px 16px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#6B5F58' }}>{t.total}</span>
              {discountPercent > 0 ? (
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 14, color: '#9B8F88', textDecoration: 'line-through' }}>{priceUsd}</span>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926' }}>{discountedDisplay}</span>
                </span>
              ) : (
                <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926' }}>{priceUsd}</span>
              )}
            </div>

            {/* Promo code */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#6B5F58', fontWeight: 500, marginBottom: 6 }}>
                {t.promoLabel}
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={promo}
                  onChange={e => { setPromo(e.target.value); setDiscountPercent(0); setPromoMsg('') }}
                  onKeyDown={e => e.key === 'Enter' && applyPromo()}
                  placeholder="BLOOM15"
                  style={{
                    flex: 1, border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 10,
                    padding: '10px 14px', fontSize: 14, color: '#2D2926', textTransform: 'uppercase',
                    background: '#FFF8F0', outline: 'none', fontFamily: 'DM Sans, sans-serif',
                  }}
                />
                <button
                  onClick={applyPromo}
                  disabled={promoChecking || !promo.trim()}
                  style={{
                    background: discountPercent > 0 ? '#5BA85B' : '#E8DEFF', color: discountPercent > 0 ? 'white' : '#7B5FCC',
                    border: 'none', borderRadius: 10, padding: '0 18px', fontSize: 13, fontWeight: 600,
                    cursor: promoChecking || !promo.trim() ? 'default' : 'pointer', whiteSpace: 'nowrap',
                  }}
                >
                  {promoChecking ? '…' : discountPercent > 0 ? t.applied : t.apply}
                </button>
              </div>
              {discountPercent > 0 && <div style={{ fontSize: 12, color: '#5BA85B', marginTop: 6 }}>{t.offApplied(discountPercent)}</div>}
              {promoMsg && <div style={{ fontSize: 12, color: '#c0627a', marginTop: 6 }}>{promoMsg}</div>}
            </div>

            {/* Form */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#6B5F58', fontWeight: 500, marginBottom: 6 }}>
                {t.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Diana"
                style={{
                  width: '100%', border: '1.5px solid rgba(45,41,38,0.12)', borderRadius: 10,
                  padding: '10px 14px', fontSize: 14, color: '#2D2926',
                  background: '#FFF8F0', outline: 'none', fontFamily: 'DM Sans, sans-serif',
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#6B5F58', fontWeight: 500, marginBottom: 6 }}>
                {t.emailLabel} <span style={{ color: '#B8A4E8' }}>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="hello@example.com"
                onKeyDown={e => e.key === 'Enter' && handleBuy()}
                style={{
                  width: '100%', border: `1.5px solid ${error ? '#c0627a' : 'rgba(45,41,38,0.12)'}`, borderRadius: 10,
                  padding: '10px 14px', fontSize: 14, color: '#2D2926',
                  background: '#FFF8F0', outline: 'none', fontFamily: 'DM Sans, sans-serif',
                }}
              />
              {error && <div style={{ fontSize: 12, color: '#c0627a', marginTop: 6 }}>{error}</div>}
            </div>

            <button
              onClick={handleBuy}
              disabled={loading}
              style={{
                width: '100%', background: loading ? '#D4C5F9' : '#B8A4E8', color: 'white',
                border: 'none', borderRadius: 100, padding: '14px', fontSize: 15,
                fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.payNow}
            </button>

            <p style={{ fontSize: 11, color: '#9B8F88', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
              {t.secureA}<br />
              {t.secureB}
            </p>
            </>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
