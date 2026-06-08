'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order')
  const [status, setStatus] = useState<'loading' | 'paid' | 'pending' | 'error'>('loading')
  const [downloadToken, setDownloadToken] = useState<string | null>(null)
  const [productTitle, setProductTitle] = useState<string>('')

  useEffect(() => {
    if (!orderNumber) { setStatus('error'); return }

    // Poll for payment status
    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/order-status?order=${orderNumber}`)
        const data = await res.json()

        if (data.status === 'paid') {
          setStatus('paid')
          setDownloadToken(data.downloadToken)
          setProductTitle(data.productTitle)
        } else if (data.status === 'failed') {
          setStatus('error')
        } else {
          setStatus('pending')
        }
      } catch {
        setStatus('pending')
      }
    }

    checkStatus()
    // Poll every 3 seconds for up to 2 minutes
    const interval = setInterval(checkStatus, 3000)
    const timeout = setTimeout(() => clearInterval(interval), 120000)

    return () => { clearInterval(interval); clearTimeout(timeout) }
  }, [orderNumber])

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>

        {status === 'loading' && (
          <div>
            <div style={{ fontSize: 48, marginBottom: 20 }}>⏳</div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: '#2D2926', marginBottom: 12 }}>Checking payment...</h1>
            <p style={{ fontSize: 15, color: '#6B5F58', lineHeight: 1.7 }}>Please wait a moment while we confirm your payment.</p>
          </div>
        )}

        {status === 'pending' && (
          <div>
            <div style={{ fontSize: 48, marginBottom: 20 }}>🔄</div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: '#2D2926', marginBottom: 12 }}>Processing payment...</h1>
            <p style={{ fontSize: 15, color: '#6B5F58', lineHeight: 1.7, marginBottom: 24 }}>
              Your payment is being processed. You'll receive an email with your download link shortly.
            </p>
            <div style={{ background: '#E8DEFF', borderRadius: 12, padding: '12px 20px', fontSize: 13, color: '#7B5FCC' }}>
              Order: <strong>{orderNumber}</strong>
            </div>
          </div>
        )}

        {status === 'paid' && (
          <div>
            {/* Blobs */}
            <div style={{ position: 'fixed', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,222,255,0.6) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'fixed', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,232,212,0.5) 0%, transparent 65%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
              <div style={{ background: '#D4C5F9', border: '1.5px solid #B8A4E8', borderRadius: 100, padding: '5px 16px', fontSize: 11, letterSpacing: '0.18em', color: '#7B5FCC', fontWeight: 700, textTransform: 'uppercase', display: 'inline-block', marginBottom: 20 }}>
                Payment successful
              </div>
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 32, color: '#2D2926', lineHeight: 1.2, marginBottom: 12 }}>
                Thank you! Your file is ready 🌸
              </h1>
              <p style={{ fontSize: 15, color: '#6B5F58', lineHeight: 1.7, marginBottom: 32 }}>
                {productTitle && <><strong>{productTitle}</strong> — </>}
                click the button below to download. We also sent a link to your email.
              </p>

              {downloadToken && (
                <a
                  href={`/api/download?token=${downloadToken}`}
                  style={{
                    display: 'inline-block', background: '#B8A4E8', color: 'white',
                    padding: '16px 32px', borderRadius: 100, fontSize: 16, fontWeight: 600,
                    textDecoration: 'none', boxShadow: '0 4px 20px rgba(184,164,232,0.35)',
                    marginBottom: 24,
                  }}
                >
                  Download now →
                </a>
              )}

              <div style={{ background: '#FEFCFA', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 16, padding: '20px 24px', marginBottom: 24 }}>
                <p style={{ fontSize: 13, color: '#9B8F88', lineHeight: 1.6 }}>
                  📧 A download link was also sent to your email.<br />
                  ⏰ The link is valid for 24 hours (3 downloads max).<br />
                  💬 Need help? Email us at hello@bloomfocus.org
                </p>
              </div>

              <Link href="/shop" style={{ textDecoration: 'none', fontSize: 14, color: '#6B5F58' }}>
                ← Back to shop
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div style={{ fontSize: 48, marginBottom: 20 }}>😔</div>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: '#2D2926', marginBottom: 12 }}>Something went wrong</h1>
            <p style={{ fontSize: 15, color: '#6B5F58', lineHeight: 1.7, marginBottom: 24 }}>
              Your payment could not be completed. You have not been charged.
            </p>
            <Link href="/shop" style={{
              textDecoration: 'none', background: '#B8A4E8', color: 'white',
              padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, display: 'inline-block',
            }}>
              Try again →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
