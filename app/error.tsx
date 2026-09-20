'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const COPY: Record<string, { title: string; text: string; retry: string; home: string }> = {
  en: {
    title: 'Something went wrong',
    text: "Not your fault — something on our side hiccuped. A refresh usually fixes it.",
    retry: 'Try again',
    home: 'Back to home',
  },
  de: {
    title: 'Etwas ist schiefgelaufen',
    text: 'Nicht deine Schuld – bei uns hat etwas gehakt. Ein Neuladen behebt es meistens.',
    retry: 'Erneut versuchen',
    home: 'Zur Startseite',
  },
  fr: {
    title: "Quelque chose s'est mal passé",
    text: "Ce n'est pas ta faute — un petit souci de notre côté. Recharger règle généralement le problème.",
    retry: 'Réessayer',
    home: "Retour à l'accueil",
  },
  es: {
    title: 'Algo salió mal',
    text: 'No es culpa tuya: algo falló de nuestro lado. Recargar suele arreglarlo.',
    retry: 'Intentar de nuevo',
    home: 'Volver al inicio',
  },
}

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const pathname = usePathname()
  const lang = pathname?.startsWith('/de') ? 'de' : pathname?.startsWith('/fr') ? 'fr' : pathname?.startsWith('/es') ? 'es' : 'en'
  const t = COPY[lang]

  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <div style={{ background: 'var(--cream, #FFF8F0)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 420 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🥀</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: '#2D2926', marginBottom: 12 }}>{t.title}</h1>
        <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.7, marginBottom: 28 }}>{t.text}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={reset}
            style={{ background: '#7B5FCC', color: 'white', border: 'none', padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
          >
            {t.retry}
          </button>
          <Link
            href={lang === 'en' ? '/' : `/${lang}`}
            style={{ textDecoration: 'none', background: 'transparent', color: '#6B5F58', padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 500, border: '1.5px solid rgba(45,41,38,0.12)', display: 'inline-block' }}
          >
            {t.home}
          </Link>
        </div>
      </div>
    </div>
  )
}
