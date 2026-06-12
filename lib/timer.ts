'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

// Ask the browser for notification permission. Returns true if granted.
export function ensureNotificationPermission(): Promise<boolean> {
  if (typeof Notification === 'undefined') return Promise.resolve(false)
  if (Notification.permission === 'granted') return Promise.resolve(true)
  if (Notification.permission === 'denied') return Promise.resolve(false)
  return Notification.requestPermission().then(p => p === 'granted').catch(() => false)
}

// Fire a notification if allowed. Works while the page is alive (foreground or
// recently-backgrounded). A fully suspended/killed PWA may show it on return.
export function notify(title: string, body: string) {
  try {
    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/icons/icon-192.png', badge: '/icons/icon-192.png' })
    }
  } catch { /* ignore */ }
}

// A countdown that survives tab-switching / app backgrounding because it counts
// from an absolute end timestamp instead of decrementing a counter. setInterval
// is only used to refresh the display; the real source of truth is the clock.
// On returning to the tab (visibilitychange) it recomputes immediately.
export function useCountdown(onComplete: () => void) {
  const [remaining, setRemaining] = useState(0)
  const [running, setRunning] = useState(false)
  const endRef = useRef<number | null>(null)
  const doneRef = useRef(false)
  const cb = useRef(onComplete)
  cb.current = onComplete

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true
    endRef.current = null
    setRunning(false)
    setRemaining(0)
    cb.current()
  }, [])

  useEffect(() => {
    if (!running) return
    const tick = () => {
      if (endRef.current == null) return
      const rem = Math.max(0, Math.round((endRef.current - Date.now()) / 1000))
      setRemaining(rem)
      if (rem <= 0) finish()
    }
    tick()
    const id = window.setInterval(tick, 250)
    const onVis = () => { if (document.visibilityState === 'visible') tick() }
    document.addEventListener('visibilitychange', onVis)
    return () => { window.clearInterval(id); document.removeEventListener('visibilitychange', onVis) }
  }, [running, finish])

  // Start counting toward an absolute end timestamp (ms).
  const startAt = useCallback((end: number) => {
    endRef.current = end
    doneRef.current = false
    setRemaining(Math.max(0, Math.round((end - Date.now()) / 1000)))
    setRunning(true)
  }, [])

  const start = useCallback((sec: number) => startAt(Date.now() + sec * 1000), [startAt])

  const pause = useCallback(() => { endRef.current = null; setRunning(false) }, [])

  const resume = useCallback(() => { if (remaining > 0) start(remaining) }, [remaining, start])

  const reset = useCallback((sec: number) => {
    endRef.current = null
    doneRef.current = false
    setRunning(false)
    setRemaining(sec)
  }, [])

  const stop = useCallback(() => {
    endRef.current = null
    doneRef.current = true
    setRunning(false)
    setRemaining(0)
  }, [])

  return { remaining, running, start, startAt, pause, resume, reset, stop }
}

// Parse a human time string like "20 min", "1-5 min", "30+ min" into seconds.
// Uses the largest number found (upper bound of a range). Returns 0 if none.
export function parseMinutes(time: string | null | undefined): number {
  if (!time) return 0
  const nums = (time.match(/\d+/g) || []).map(Number)
  if (nums.length === 0) return 0
  return Math.max(...nums)
}
