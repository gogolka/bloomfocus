import type { Lang } from '@/lib/i18n'

export interface ConsentDict {
  title: string
  body: string
  privacyLink: string
  acceptAll: string
  rejectAll: string
  customise: string
  save: string
  back: string
  necessaryTitle: string
  necessaryDesc: string
  necessaryAlways: string
  analyticsTitle: string
  analyticsDesc: string
  advertisingTitle: string
  advertisingDesc: string
  cookieSettings: string
  ariaLabel: string
}

export const consentDict: Record<Lang, ConsentDict> = {
  en: {
    title: `A quick word about cookies`,
    body: `We use essential cookies to keep the site working. With your permission we'd also like to use analytics cookies to understand which articles help people, and advertising cookies so the blog can pay for itself. You can change your mind at any time.`,
    privacyLink: `Read our Privacy Policy`,
    acceptAll: `Accept all`,
    rejectAll: `Reject non-essential`,
    customise: `Choose what to allow`,
    save: `Save my choices`,
    back: `Back`,
    necessaryTitle: `Strictly necessary`,
    necessaryDesc: `Login sessions and your language preference. The site can't work without these.`,
    necessaryAlways: `Always on`,
    analyticsTitle: `Analytics`,
    analyticsDesc: `Anonymous statistics about which pages get read, so we know what to write more of.`,
    advertisingTitle: `Advertising`,
    advertisingDesc: `Lets Google AdSense show ads on the blog and measure them. Without this you'll still see the site, just no personalised ads.`,
    cookieSettings: `Cookie settings`,
    ariaLabel: `Cookie consent`,
  },
  de: {
    title: `Kurz zu den Cookies`,
    body: `Wir verwenden notwendige Cookies, damit die Seite funktioniert. Mit deiner Erlaubnis möchten wir zusätzlich Analyse-Cookies nutzen, um zu verstehen, welche Artikel wirklich helfen, und Werbe-Cookies, damit sich der Blog selbst trägt. Du kannst deine Entscheidung jederzeit ändern.`,
    privacyLink: `Datenschutzerklärung lesen`,
    acceptAll: `Alle akzeptieren`,
    rejectAll: `Nur notwendige`,
    customise: `Selbst auswählen`,
    save: `Auswahl speichern`,
    back: `Zurück`,
    necessaryTitle: `Unbedingt erforderlich`,
    necessaryDesc: `Login-Sitzungen und deine Spracheinstellung. Ohne diese funktioniert die Seite nicht.`,
    necessaryAlways: `Immer aktiv`,
    analyticsTitle: `Analyse`,
    analyticsDesc: `Anonyme Statistiken darüber, welche Seiten gelesen werden — damit wir wissen, wovon wir mehr schreiben sollen.`,
    advertisingTitle: `Werbung`,
    advertisingDesc: `Erlaubt Google AdSense, Anzeigen im Blog auszuspielen und zu messen. Ohne dies siehst du die Seite weiterhin, nur ohne personalisierte Werbung.`,
    cookieSettings: `Cookie-Einstellungen`,
    ariaLabel: `Cookie-Einwilligung`,
  },
  fr: {
    title: `Un mot rapide sur les cookies`,
    body: `Nous utilisons des cookies essentiels pour que le site fonctionne. Avec ton accord, nous aimerions aussi utiliser des cookies de mesure d'audience, pour comprendre quels articles aident vraiment, et des cookies publicitaires, pour que le blog puisse s'autofinancer. Tu peux changer d'avis à tout moment.`,
    privacyLink: `Lire notre politique de confidentialité`,
    acceptAll: `Tout accepter`,
    rejectAll: `Essentiels uniquement`,
    customise: `Choisir moi-même`,
    save: `Enregistrer mes choix`,
    back: `Retour`,
    necessaryTitle: `Strictement nécessaires`,
    necessaryDesc: `Sessions de connexion et préférence de langue. Le site ne peut pas fonctionner sans eux.`,
    necessaryAlways: `Toujours actifs`,
    analyticsTitle: `Mesure d'audience`,
    analyticsDesc: `Statistiques anonymes sur les pages lues, pour savoir de quoi écrire davantage.`,
    advertisingTitle: `Publicité`,
    advertisingDesc: `Permet à Google AdSense d'afficher des annonces sur le blog et de les mesurer. Sans cela, tu vois toujours le site, simplement sans publicité personnalisée.`,
    cookieSettings: `Paramètres des cookies`,
    ariaLabel: `Consentement aux cookies`,
  },
  es: {
    title: `Un momento, sobre las cookies`,
    body: `Usamos cookies esenciales para que la web funcione. Con tu permiso, nos gustaría usar también cookies de analítica, para entender qué artículos ayudan de verdad, y cookies publicitarias, para que el blog pueda sostenerse solo. Puedes cambiar de opinión cuando quieras.`,
    privacyLink: `Leer nuestra política de privacidad`,
    acceptAll: `Aceptar todo`,
    rejectAll: `Solo esenciales`,
    customise: `Elegir qué permitir`,
    save: `Guardar mis preferencias`,
    back: `Volver`,
    necessaryTitle: `Estrictamente necesarias`,
    necessaryDesc: `Sesiones de inicio de sesión y tu preferencia de idioma. La web no funciona sin ellas.`,
    necessaryAlways: `Siempre activas`,
    analyticsTitle: `Analítica`,
    analyticsDesc: `Estadísticas anónimas sobre qué páginas se leen, para saber de qué escribir más.`,
    advertisingTitle: `Publicidad`,
    advertisingDesc: `Permite que Google AdSense muestre anuncios en el blog y los mida. Sin esto seguirás viendo la web, solo que sin anuncios personalizados.`,
    cookieSettings: `Configuración de cookies`,
    ariaLabel: `Consentimiento de cookies`,
  },
}
