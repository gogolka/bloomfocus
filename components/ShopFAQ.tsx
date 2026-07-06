'use client'
import { useState } from 'react'
import Script from 'next/script'
import type { Lang } from '@/lib/i18n'

type QA = { q: string; a: string }

const FAQ: Record<Lang, { title: string; items: QA[] }> = {
  en: {
    title: 'Common questions',
    items: [
      { q: 'Is this a one-time payment or a subscription?', a: 'All planners, workbooks and posters are a one-time payment. You buy it once and it\'s yours forever. Only the optional Pro app plan is a subscription — and it\'s completely separate.' },
      { q: 'What exactly do I get after paying?', a: 'A download link appears right on the confirmation page, and we also email it to you. The file is a high-quality PDF, available in English, German, French and Spanish — you pick your language on the download page.' },
      { q: 'Can I print it more than once?', a: 'Yes — print as many copies as you like, forever. It\'s for your personal use, so reprint whenever you need a fresh page.' },
      { q: 'Do I need any special app to use it?', a: 'No. Any PDF reader works. You can print it at home, at a print shop, or use it digitally in apps like GoodNotes on a tablet.' },
      { q: 'What if the download link expires?', a: 'Links are valid for 7 days, but if yours expires — just reply to your order email and we\'ll send a fresh one. No stress.' },
      { q: 'Is this a medical product?', a: 'No. Our products are self-organisation tools inspired by CBT techniques. They\'re not a diagnosis, treatment, or a replacement for professional care.' },
    ],
  },
  de: {
    title: 'Häufige Fragen',
    items: [
      { q: 'Ist das eine Einmalzahlung oder ein Abo?', a: 'Alle Planer, Arbeitshefte und Poster sind eine Einmalzahlung. Einmal gekauft, für immer deins. Nur der optionale Pro-Plan der App ist ein Abo — und komplett separat.' },
      { q: 'Was genau bekomme ich nach der Zahlung?', a: 'Ein Download-Link erscheint direkt auf der Bestätigungsseite, und wir schicken ihn dir auch per E-Mail. Die Datei ist ein hochwertiges PDF auf Englisch, Deutsch, Französisch und Spanisch — du wählst deine Sprache auf der Download-Seite.' },
      { q: 'Kann ich es mehrmals drucken?', a: 'Ja — drucke so viele Kopien, wie du möchtest, für immer. Es ist für deinen persönlichen Gebrauch.' },
      { q: 'Brauche ich eine spezielle App?', a: 'Nein. Jeder PDF-Reader funktioniert. Du kannst zu Hause drucken, im Copyshop, oder es digital in Apps wie GoodNotes auf dem Tablet nutzen.' },
      { q: 'Was, wenn der Download-Link abläuft?', a: 'Links sind 7 Tage gültig. Falls deiner abläuft — antworte einfach auf deine Bestell-E-Mail und wir schicken einen neuen. Kein Stress.' },
      { q: 'Ist das ein medizinisches Produkt?', a: 'Nein. Unsere Produkte sind Selbstorganisations-Tools, inspiriert von KVT-Techniken. Sie sind keine Diagnose, Behandlung oder Ersatz für professionelle Hilfe.' },
    ],
  },
  fr: {
    title: 'Questions fréquentes',
    items: [
      { q: 'Est-ce un paiement unique ou un abonnement ?', a: 'Tous les planificateurs, cahiers et posters sont un paiement unique. Acheté une fois, à toi pour toujours. Seul le plan Pro optionnel de l\'app est un abonnement — et il est complètement séparé.' },
      { q: 'Qu\'est-ce que je reçois exactement après le paiement ?', a: 'Un lien de téléchargement apparaît directement sur la page de confirmation, et on te l\'envoie aussi par e-mail. Le fichier est un PDF de haute qualité, disponible en anglais, allemand, français et espagnol — tu choisis ta langue sur la page de téléchargement.' },
      { q: 'Puis-je l\'imprimer plusieurs fois ?', a: 'Oui — imprime autant de copies que tu veux, pour toujours. C\'est pour ton usage personnel.' },
      { q: 'Ai-je besoin d\'une app spéciale ?', a: 'Non. N\'importe quel lecteur PDF fonctionne. Tu peux imprimer chez toi, en imprimerie, ou l\'utiliser en numérique dans des apps comme GoodNotes sur tablette.' },
      { q: 'Et si le lien de téléchargement expire ?', a: 'Les liens sont valables 7 jours. Si le tien expire — réponds simplement à ton e-mail de commande et on t\'en envoie un nouveau. Pas de stress.' },
      { q: 'Est-ce un produit médical ?', a: 'Non. Nos produits sont des outils d\'auto-organisation inspirés des techniques de TCC. Ce n\'est ni un diagnostic, ni un traitement, ni un remplacement de soins professionnels.' },
    ],
  },
  es: {
    title: 'Preguntas frecuentes',
    items: [
      { q: '¿Es un pago único o una suscripción?', a: 'Todos los planificadores, cuadernos y pósters son un pago único. Lo compras una vez y es tuyo para siempre. Solo el plan Pro opcional de la app es una suscripción — y es completamente independiente.' },
      { q: '¿Qué recibo exactamente después de pagar?', a: 'Un enlace de descarga aparece directamente en la página de confirmación, y también te lo enviamos por correo. El archivo es un PDF de alta calidad, disponible en inglés, alemán, francés y español — eliges tu idioma en la página de descarga.' },
      { q: '¿Puedo imprimirlo más de una vez?', a: 'Sí — imprime tantas copias como quieras, para siempre. Es para tu uso personal.' },
      { q: '¿Necesito alguna app especial?', a: 'No. Cualquier lector de PDF funciona. Puedes imprimir en casa, en una imprenta, o usarlo digitalmente en apps como GoodNotes en tablet.' },
      { q: '¿Y si el enlace de descarga caduca?', a: 'Los enlaces son válidos 7 días. Si el tuyo caduca — simplemente responde a tu correo de pedido y te enviamos uno nuevo. Sin estrés.' },
      { q: '¿Es un producto médico?', a: 'No. Nuestros productos son herramientas de autoorganización inspiradas en técnicas de TCC. No son un diagnóstico, tratamiento ni sustituto de atención profesional.' },
    ],
  },
}

export default function ShopFAQ({ lang }: { lang: Lang }) {
  const t = FAQ[lang]
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section style={{ padding: '64px 24px 80px', background: '#FEFCFA' }}>
      <div className="reveal" style={{ maxWidth: 680, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(24px, 3.5vw, 32px)', color: '#2D2926', textAlign: 'center', marginBottom: 36 }}>
          {t.title}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {t.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ background: '#FFF8F0', border: '1px solid rgba(45,41,38,0.08)', borderRadius: 16, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{ width: '100%', background: 'none', border: 'none', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, cursor: 'pointer', textAlign: 'left', fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#2D2926', lineHeight: 1.4 }}>{item.q}</span>
                  <span style={{ fontSize: 18, color: '#B8A4E8', flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                </button>
                {isOpen && (
                  <div style={{ padding: '0 20px 18px', fontSize: 14, color: '#6B5F58', lineHeight: 1.7 }}>
                    {item.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <Script
        id="shop-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: t.items.map(item => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          }),
        }}
      />
    </section>
  )
}
