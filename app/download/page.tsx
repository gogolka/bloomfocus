import { Suspense } from 'react'
import DownloadClient from './DownloadClient'

export default function DownloadPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#FFF8F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🌸</div>
          <p style={{ color: '#6B5F58', fontFamily: 'Georgia, serif' }}>Preparing your download…</p>
        </div>
      </div>
    }>
      <DownloadClient />
    </Suspense>
  )
}
