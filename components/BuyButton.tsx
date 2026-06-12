'use client'
import { useState } from 'react'

interface BuyButtonProps {
  productSlug: string
  productTitle: string
  priceUsd: string
}

export default function BuyButton({ productSlug, productTitle, priceUsd }: BuyButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleBuy = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productSlug, customerEmail: email, customerName: name }),
      })

      const data = await res.json()

      if (!res.ok || !data.paymentUrl) {
        setError((data.error || 'Something went wrong') + (data.detail ? `: ${data.detail}` : ''))
        setLoading(false)
        return
      }

      // Redirect to Monobank payment page
      window.location.href = data.paymentUrl

    } catch {
      setError('Connection error. Please try again.')
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
        Buy now →
      </button>

      {showModal && (
        <div
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false) }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(45,41,38,0.5)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div style={{
            background: '#FEFCFA', borderRadius: 24, padding: '36px 32px',
            maxWidth: 420, width: '100%',
            boxShadow: '0 20px 60px rgba(45,41,38,0.2)',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926', marginBottom: 4 }}>
                  {productTitle}
                </div>
                <div style={{ fontSize: 13, color: '#9B8F88' }}>Enter your email to continue</div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#9B8F88', lineHeight: 1 }}
              >✕</button>
            </div>

            {/* Price */}
            <div style={{ background: '#E8DEFF', borderRadius: 12, padding: '12px 16px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#6B5F58' }}>Total</span>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: '#2D2926' }}>{priceUsd}</span>
            </div>

            {/* Form */}
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, color: '#6B5F58', fontWeight: 500, marginBottom: 6 }}>
                Your name (optional)
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
                Email address <span style={{ color: '#B8A4E8' }}>*</span>
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
              {loading ? 'Redirecting to payment...' : 'Pay now →'}
            </button>

            <p style={{ fontSize: 11, color: '#9B8F88', textAlign: 'center', marginTop: 14, lineHeight: 1.5 }}>
              🔒 Secure payment via Monobank<br />
              📧 Download link sent to your email instantly after payment
            </p>
          </div>
        </div>
      )}
    </>
  )
}
