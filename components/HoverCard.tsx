'use client'
import { useState } from 'react'

interface HoverCardProps {
  children: React.ReactNode
  style?: React.CSSProperties
  hoverStyle?: React.CSSProperties
}

export function HoverCard({ children, style, hoverStyle }: HoverCardProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ ...style, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  )
}

interface HoverLinkCardProps {
  children: React.ReactNode
  style?: React.CSSProperties
  hoverStyle?: React.CSSProperties
  className?: string
}

export function HoverLinkCard({ children, style, hoverStyle, className }: HoverLinkCardProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className={className}
      style={{ ...style, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  )
}
