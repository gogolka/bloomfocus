'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const COPY: Record<string, { title: string; text: string; home: string }> = {
  en: {
    title: 'Page not found',
    text: "This page doesn't exist — but that's okay. One small step back is all it takes.",
    home: 'Back to home 🌸',
  },
  de: {
    title: 'Seite nicht gefunden',
    text: 'Diese Seite existiert nicht – aber das ist okay. Ein kleiner Schritt zurück genügt.',
    home: 'Zur Startseite 🌸',
  },
  fr: {
    title: 'Page introuvable',
    text: "Cette page n'existe pas — mais ce n'est pas grave. Un petit pas en arrière suffit.",
    home: "Retour à l'accueil 🌸",
  },
  es: {
    title: 'Página no encontrada',
    text: 'Esta página no existe, pero está bien. Un pequeño paso atrás es todo lo que hace falta.',
    home: 'Volver al inicio 🌸',
  },
}

export default function NotFound() {
  const pathname = usePathname()
  const lang = pathname?.startsWith('/de') ? 'de' : pathname?.startsWith('/fr') ? 'fr' : pathname?.startsWith('/es') ? 'es' : 'en'
  const t = COPY[lang]

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: 400 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 80, color: '#D4C5F9', lineHeight: 1, marginBottom: 16 }}>404</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: '#2D2926', marginBottom: 12 }}>{t.title}</h1>
        <p style={{ fontSize: 14, color: '#6B5F58', lineHeight: 1.6, marginBottom: 28 }}>{t.text}</p>
        <Link href={lang === 'en' ? '/' : `/${lang}`} style={{
          textDecoration: 'none', background: '#B8A4E8', color: 'white',
          padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, display: 'inline-block',
        }}>
          {t.home}
        </Link>
      </div>
    </div>
  )
}
