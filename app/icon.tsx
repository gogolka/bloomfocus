import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#B8A4E8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Simple flower: center circle + 5 petals */}
        <svg width="22" height="22" viewBox="0 0 22 22">
          <ellipse cx="11" cy="5" rx="4" ry="4.5" fill="#FFF8F0" />
          <ellipse cx="11" cy="17" rx="4" ry="4.5" fill="#FFF8F0" />
          <ellipse cx="5" cy="8" rx="4.5" ry="4" fill="#FFF8F0" />
          <ellipse cx="17" cy="8" rx="4.5" ry="4" fill="#FFF8F0" />
          <ellipse cx="5" cy="14" rx="4.5" ry="4" fill="#FFF8F0" />
          <ellipse cx="17" cy="14" rx="4.5" ry="4" fill="#FFF8F0" />
          <circle cx="11" cy="11" r="5" fill="#FFF8F0" />
          <circle cx="11" cy="11" r="3" fill="#FFD6C4" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
