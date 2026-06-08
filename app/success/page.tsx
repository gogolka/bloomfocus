import { Suspense } from 'react'
import SuccessContent from './SuccessContent'

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#2D2926' }}>Loading...</div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
