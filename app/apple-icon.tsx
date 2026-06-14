import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: '#B8A4E8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          <ellipse cx="60" cy="22" rx="22" ry="26" fill="#FFF8F0" />
          <ellipse cx="60" cy="98" rx="22" ry="26" fill="#FFF8F0" />
          <ellipse cx="22" cy="42" rx="26" ry="22" fill="#FFF8F0" />
          <ellipse cx="98" cy="42" rx="26" ry="22" fill="#FFF8F0" />
          <ellipse cx="22" cy="78" rx="26" ry="22" fill="#FFF8F0" />
          <ellipse cx="98" cy="78" rx="26" ry="22" fill="#FFF8F0" />
          <circle cx="60" cy="60" r="28" fill="#FFF8F0" />
          <circle cx="60" cy="60" r="16" fill="#FFD6C4" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
