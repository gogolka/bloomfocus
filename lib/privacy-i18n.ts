import type { Lang } from '@/lib/i18n'
import { CONTACT_EMAIL } from '@/lib/site'

// Privacy Policy content for all four locales.
//
// Body strings use the same inline markup as article content (**bold**,
// [label](url)), so PrivacyContent renders them through the shared RichText
// component — one markup system across the whole site rather than a second one
// just for legal pages.

export interface PrivacySection {
  h2: string
  body: string[]
}

export interface PrivacyDict {
  metaTitle: string
  metaDescription: string
  h1: string
  updated: string
  intro: string
  sections: PrivacySection[]
}

const GOOGLE_PARTNER = 'https://policies.google.com/technologies/partner-sites'
const GOOGLE_ADS = 'https://adssettings.google.com'
const GOOGLE_PRIVACY = 'https://policies.google.com/privacy'
const ABOUT_ADS = 'https://www.aboutads.info/choices/'

export const privacyDict: Record<Lang, PrivacyDict> = {
  en: {
    metaTitle: 'Privacy Policy — bloom focus',
    metaDescription: 'How bloom focus collects, uses and protects your data.',
    h1: 'Privacy Policy',
    updated: 'Last updated: September 2026',
    intro: `bloom focus (bloomfocus.org) is operated by an individual entrepreneur registered in Ukraine. We keep data collection to the minimum needed to run the shop and the app, and we never sell your data. This page explains what we collect, why, and what your rights are.`,
    sections: [
      {
        h2: 'What we collect',
        body: [
          `**When you buy a product:** your email address and name (if provided), the product you bought, and payment status. Card details are processed entirely by our payment provider WayForPay — we never see or store your card number.`,
          `**When you join the newsletter or take the ADHD quiz:** your email address, name (if provided), quiz result type, and preferred language.`,
          `**When you create an app account:** your email, password (stored encrypted by our infrastructure provider Supabase), and the content you create — tasks, habits, brain dumps, settings.`,
        ],
      },
      {
        h2: 'Why we collect it',
        body: [
          `To deliver purchased files, send order confirmations, provide the app service, send newsletter emails you signed up for, and improve the product. We also use advertising and analytics cookies on the blog — but only if you agree to them first. See **Cookies and advertising** below.`,
        ],
      },
      {
        h2: 'Who processes your data',
        body: [
          `We use a small number of trusted processors: **Supabase** (database and authentication, EU-hosted), **Vercel** (website hosting), **Brevo** (transactional and newsletter emails, EU-based), and **WayForPay** (payment processing). Each receives only the data needed for its function.`,
          `If you consent to them, two further providers may process data in your browser: **Google AdSense** (advertising on the blog) and **Google Analytics** (anonymous usage statistics). Both are operated by Google Ireland Limited.`,
        ],
      },
      {
        h2: 'How long we keep it',
        body: [
          `Order records are kept as long as required for accounting purposes. Newsletter data is kept until you unsubscribe — every email has an unsubscribe link. App account data is kept until you delete your account; you can export everything you've created at any time from Settings.`,
        ],
      },
      {
        h2: 'Your rights (GDPR)',
        body: [
          `If you're in the EU/EEA, you have the right to access, correct, export, or delete your personal data, and to object to or restrict its processing. To exercise any of these rights, email us at [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}) — we respond within 30 days.`,
        ],
      },
      {
        h2: 'Cookies and advertising',
        body: [
          `**Essential cookies** are always active: session cookies for app login, a language preference, and a record of the cookie choice you make. These are needed for the site to work and don't track you anywhere else.`,
          `**Analytics cookies** are used only with your consent. We use Google Analytics to count page views and see which articles are actually read, with IP anonymisation enabled. We use this to decide what to write more of — not to build a profile of you.`,
          `**Advertising cookies** are used only with your consent. The blog is funded by **Google AdSense**. When you allow advertising cookies, Google and its partners may set and read cookies on your device to show ads, to limit how often you see the same ad, and to measure whether ads work. Google may use this data to show you **personalised advertising** based on your prior visits to this and other websites.`,
          `You can refuse advertising cookies entirely — the blog stays fully readable, you'll simply see non-personalised ads or none at all. You can change or withdraw your choice at any time using the **Cookie settings** link in the footer of every page; withdrawing is as easy as giving consent, and takes effect immediately.`,
          `To understand how Google uses data from sites that use its services, see [How Google uses information from sites that use our services](${GOOGLE_PARTNER}). You can also opt out of personalised advertising directly with Google at [Google Ads Settings](${GOOGLE_ADS}), review [Google's Privacy Policy](${GOOGLE_PRIVACY}), or opt out of third-party vendor cookies at [aboutads.info/choices](${ABOUT_ADS}).`,
          `Third-party vendors, including Google, use cookies to serve ads based on your previous visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this and/or other sites on the internet.`,
        ],
      },
      {
        h2: 'Children',
        body: [
          `Our products and app are intended for adults (18+). We do not knowingly collect data from children.`,
        ],
      },
      {
        h2: 'Contact',
        body: [
          `Questions about this policy or your data: [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}). Full legal details of the business are available on request.`,
        ],
      },
    ],
  },

  de: {
    metaTitle: 'Datenschutzerklärung — bloom focus',
    metaDescription: 'Wie bloom focus deine Daten erhebt, verwendet und schützt.',
    h1: 'Datenschutzerklärung',
    updated: 'Zuletzt aktualisiert: September 2026',
    intro: `bloom focus (bloomfocus.org) wird von einer in der Ukraine registrierten Einzelunternehmerin betrieben. Wir erheben nur so viele Daten, wie für den Shop und die App nötig sind, und wir verkaufen deine Daten niemals. Diese Seite erklärt, was wir erheben, warum, und welche Rechte du hast.`,
    sections: [
      {
        h2: 'Was wir erheben',
        body: [
          `**Wenn du ein Produkt kaufst:** deine E-Mail-Adresse und deinen Namen (falls angegeben), das gekaufte Produkt und den Zahlungsstatus. Kartendaten werden vollständig von unserem Zahlungsanbieter WayForPay verarbeitet — wir sehen und speichern deine Kartennummer nie.`,
          `**Wenn du den Newsletter abonnierst oder den ADHS-Test machst:** deine E-Mail-Adresse, deinen Namen (falls angegeben), dein Testergebnis und deine bevorzugte Sprache.`,
          `**Wenn du ein App-Konto erstellst:** deine E-Mail-Adresse, dein Passwort (verschlüsselt gespeichert von unserem Infrastrukturanbieter Supabase) und die Inhalte, die du erstellst — Aufgaben, Gewohnheiten, Brain Dumps, Einstellungen.`,
        ],
      },
      {
        h2: 'Warum wir sie erheben',
        body: [
          `Um gekaufte Dateien auszuliefern, Bestellbestätigungen zu senden, die App bereitzustellen, die von dir abonnierten Newsletter zu verschicken und das Produkt zu verbessern. Außerdem verwenden wir im Blog Werbe- und Analyse-Cookies — aber nur, wenn du vorher zustimmst. Siehe **Cookies und Werbung** weiter unten.`,
        ],
      },
      {
        h2: 'Wer deine Daten verarbeitet',
        body: [
          `Wir nutzen wenige vertrauenswürdige Auftragsverarbeiter: **Supabase** (Datenbank und Authentifizierung, EU-gehostet), **Vercel** (Website-Hosting), **Brevo** (Transaktions- und Newsletter-E-Mails, EU-basiert) und **WayForPay** (Zahlungsabwicklung). Jeder erhält nur die Daten, die für seine Funktion nötig sind.`,
          `Wenn du zustimmst, können zwei weitere Anbieter Daten in deinem Browser verarbeiten: **Google AdSense** (Werbung im Blog) und **Google Analytics** (anonyme Nutzungsstatistiken). Beide werden von Google Ireland Limited betrieben.`,
        ],
      },
      {
        h2: 'Wie lange wir sie speichern',
        body: [
          `Bestelldaten werden so lange aufbewahrt, wie es steuerlich erforderlich ist. Newsletter-Daten bleiben gespeichert, bis du dich abmeldest — jede E-Mail enthält einen Abmeldelink. App-Kontodaten bleiben gespeichert, bis du dein Konto löschst; du kannst alles, was du erstellt hast, jederzeit in den Einstellungen exportieren.`,
        ],
      },
      {
        h2: 'Deine Rechte (DSGVO)',
        body: [
          `Wenn du in der EU/im EWR bist, hast du das Recht auf Auskunft, Berichtigung, Datenübertragbarkeit und Löschung deiner personenbezogenen Daten sowie das Recht, der Verarbeitung zu widersprechen oder sie einschränken zu lassen. Um eines dieser Rechte auszuüben, schreib uns an [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}) — wir antworten innerhalb von 30 Tagen.`,
        ],
      },
      {
        h2: 'Cookies und Werbung',
        body: [
          `**Notwendige Cookies** sind immer aktiv: Sitzungs-Cookies für den App-Login, deine Spracheinstellung und die Speicherung deiner Cookie-Entscheidung. Sie sind für den Betrieb der Seite erforderlich und verfolgen dich nirgendwo sonst.`,
          `**Analyse-Cookies** werden nur mit deiner Einwilligung verwendet. Wir nutzen Google Analytics, um Seitenaufrufe zu zählen und zu sehen, welche Artikel tatsächlich gelesen werden, mit aktivierter IP-Anonymisierung. Wir nutzen das, um zu entscheiden, wovon wir mehr schreiben sollen — nicht, um ein Profil von dir zu erstellen.`,
          `**Werbe-Cookies** werden nur mit deiner Einwilligung verwendet. Der Blog wird durch **Google AdSense** finanziert. Wenn du Werbe-Cookies erlaubst, können Google und seine Partner Cookies auf deinem Gerät setzen und auslesen, um Anzeigen auszuspielen, die Häufigkeit derselben Anzeige zu begrenzen und die Wirkung von Anzeigen zu messen. Google kann diese Daten nutzen, um dir **personalisierte Werbung** auf Grundlage deiner früheren Besuche auf dieser und anderen Websites zu zeigen.`,
          `Du kannst Werbe-Cookies vollständig ablehnen — der Blog bleibt uneingeschränkt lesbar, du siehst dann einfach nicht-personalisierte Werbung oder gar keine. Du kannst deine Entscheidung jederzeit über den Link **Cookie-Einstellungen** im Fußbereich jeder Seite ändern oder widerrufen; der Widerruf ist so einfach wie die Einwilligung und wirkt sofort.`,
          `Wie Google Daten von Websites verwendet, die seine Dienste nutzen, erfährst du unter [Wie Google Daten von Websites verwendet, die unsere Dienste nutzen](${GOOGLE_PARTNER}). Du kannst personalisierte Werbung auch direkt bei Google unter [Google Anzeigeneinstellungen](${GOOGLE_ADS}) deaktivieren, die [Datenschutzerklärung von Google](${GOOGLE_PRIVACY}) lesen oder Cookies von Drittanbietern unter [aboutads.info/choices](${ABOUT_ADS}) ablehnen.`,
          `Drittanbieter, einschließlich Google, verwenden Cookies, um Anzeigen auf Grundlage früherer Besuche auf dieser oder anderen Websites auszuspielen. Die Verwendung von Werbe-Cookies durch Google ermöglicht es Google und seinen Partnern, dir Anzeigen auf Grundlage deines Besuchs auf dieser und/oder anderen Websites im Internet zu zeigen.`,
        ],
      },
      {
        h2: 'Kinder',
        body: [
          `Unsere Produkte und die App richten sich an Erwachsene (18+). Wir erheben wissentlich keine Daten von Kindern.`,
        ],
      },
      {
        h2: 'Kontakt',
        body: [
          `Fragen zu dieser Erklärung oder zu deinen Daten: [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}). Vollständige rechtliche Angaben zum Unternehmen sind auf Anfrage erhältlich.`,
        ],
      },
    ],
  },

  fr: {
    metaTitle: 'Politique de confidentialité — bloom focus',
    metaDescription: 'Comment bloom focus collecte, utilise et protège tes données.',
    h1: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : septembre 2026',
    intro: `bloom focus (bloomfocus.org) est exploité par une entrepreneuse individuelle enregistrée en Ukraine. Nous limitons la collecte de données au strict nécessaire pour faire fonctionner la boutique et l'application, et nous ne vendons jamais tes données. Cette page explique ce que nous collectons, pourquoi, et quels sont tes droits.`,
    sections: [
      {
        h2: 'Ce que nous collectons',
        body: [
          `**Quand tu achètes un produit :** ton adresse e-mail et ton nom (si tu le renseignes), le produit acheté et le statut du paiement. Les données bancaires sont traitées entièrement par notre prestataire de paiement WayForPay — nous ne voyons ni ne stockons jamais ton numéro de carte.`,
          `**Quand tu t'inscris à la newsletter ou fais le test TDAH :** ton adresse e-mail, ton nom (si tu le renseignes), ton type de résultat et ta langue préférée.`,
          `**Quand tu crées un compte dans l'application :** ton e-mail, ton mot de passe (stocké chiffré par notre hébergeur Supabase) et les contenus que tu crées — tâches, habitudes, brain dumps, réglages.`,
        ],
      },
      {
        h2: 'Pourquoi nous les collectons',
        body: [
          `Pour livrer les fichiers achetés, envoyer les confirmations de commande, fournir le service de l'application, envoyer les newsletters auxquelles tu t'es inscrit·e et améliorer le produit. Nous utilisons aussi des cookies publicitaires et de mesure d'audience sur le blog — mais uniquement si tu les acceptes au préalable. Voir **Cookies et publicité** ci-dessous.`,
        ],
      },
      {
        h2: 'Qui traite tes données',
        body: [
          `Nous faisons appel à un petit nombre de sous-traitants de confiance : **Supabase** (base de données et authentification, hébergé dans l'UE), **Vercel** (hébergement du site), **Brevo** (e-mails transactionnels et newsletters, basé dans l'UE) et **WayForPay** (traitement des paiements). Chacun ne reçoit que les données nécessaires à sa fonction.`,
          `Si tu y consens, deux autres prestataires peuvent traiter des données dans ton navigateur : **Google AdSense** (publicité sur le blog) et **Google Analytics** (statistiques d'usage anonymes). Les deux sont exploités par Google Ireland Limited.`,
        ],
      },
      {
        h2: 'Combien de temps nous les conservons',
        body: [
          `Les enregistrements de commande sont conservés aussi longtemps que la comptabilité l'exige. Les données de newsletter sont conservées jusqu'à ta désinscription — chaque e-mail contient un lien de désinscription. Les données de ton compte sont conservées jusqu'à ce que tu le supprimes ; tu peux exporter tout ce que tu as créé à tout moment depuis les Réglages.`,
        ],
      },
      {
        h2: 'Tes droits (RGPD)',
        body: [
          `Si tu es dans l'UE/l'EEE, tu as le droit d'accéder à tes données personnelles, de les rectifier, de les exporter ou de les supprimer, et de t'opposer à leur traitement ou de le faire limiter. Pour exercer l'un de ces droits, écris-nous à [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}) — nous répondons sous 30 jours.`,
        ],
      },
      {
        h2: 'Cookies et publicité',
        body: [
          `**Les cookies essentiels** sont toujours actifs : cookies de session pour la connexion à l'application, préférence de langue et mémorisation de ton choix en matière de cookies. Ils sont nécessaires au fonctionnement du site et ne te suivent nulle part ailleurs.`,
          `**Les cookies de mesure d'audience** ne sont utilisés qu'avec ton consentement. Nous utilisons Google Analytics pour compter les pages vues et voir quels articles sont réellement lus, avec l'anonymisation d'IP activée. Cela nous sert à décider de quoi écrire davantage — pas à construire un profil de toi.`,
          `**Les cookies publicitaires** ne sont utilisés qu'avec ton consentement. Le blog est financé par **Google AdSense**. Si tu acceptes les cookies publicitaires, Google et ses partenaires peuvent déposer et lire des cookies sur ton appareil pour afficher des annonces, limiter la fréquence d'une même annonce et mesurer leur efficacité. Google peut utiliser ces données pour te proposer de la **publicité personnalisée** en fonction de tes visites précédentes sur ce site et sur d'autres.`,
          `Tu peux refuser entièrement les cookies publicitaires — le blog reste parfaitement lisible, tu verras simplement des annonces non personnalisées, voire aucune. Tu peux modifier ou retirer ton choix à tout moment via le lien **Paramètres des cookies** en bas de chaque page ; le retrait est aussi simple que le consentement et prend effet immédiatement.`,
          `Pour comprendre comment Google utilise les données des sites qui recourent à ses services, consulte [Comment Google utilise les informations provenant de sites qui utilisent nos services](${GOOGLE_PARTNER}). Tu peux aussi désactiver la publicité personnalisée directement chez Google dans les [Paramètres des annonces Google](${GOOGLE_ADS}), consulter les [Règles de confidentialité de Google](${GOOGLE_PRIVACY}), ou refuser les cookies de fournisseurs tiers sur [aboutads.info/choices](${ABOUT_ADS}).`,
          `Des fournisseurs tiers, dont Google, utilisent des cookies pour diffuser des annonces en fonction de tes visites antérieures sur ce site ou sur d'autres sites. L'utilisation de cookies publicitaires par Google lui permet, ainsi qu'à ses partenaires, de te diffuser des annonces basées sur ta visite sur ce site et/ou d'autres sites sur Internet.`,
        ],
      },
      {
        h2: 'Enfants',
        body: [
          `Nos produits et notre application s'adressent aux adultes (18 ans et plus). Nous ne collectons pas sciemment de données concernant des enfants.`,
        ],
      },
      {
        h2: 'Contact',
        body: [
          `Questions sur cette politique ou sur tes données : [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}). Les informations légales complètes de l'entreprise sont disponibles sur demande.`,
        ],
      },
    ],
  },

  es: {
    metaTitle: 'Política de privacidad — bloom focus',
    metaDescription: 'Cómo bloom focus recoge, usa y protege tus datos.',
    h1: 'Política de privacidad',
    updated: 'Última actualización: septiembre de 2026',
    intro: `bloom focus (bloomfocus.org) está gestionado por una empresaria individual registrada en Ucrania. Recogemos solo los datos mínimos necesarios para que funcionen la tienda y la app, y nunca vendemos tus datos. Esta página explica qué recogemos, por qué, y cuáles son tus derechos.`,
    sections: [
      {
        h2: 'Qué recogemos',
        body: [
          `**Cuando compras un producto:** tu dirección de correo y tu nombre (si lo indicas), el producto comprado y el estado del pago. Los datos de la tarjeta los procesa íntegramente nuestro proveedor de pagos WayForPay — nosotras nunca vemos ni guardamos tu número de tarjeta.`,
          `**Cuando te suscribes a la newsletter o haces el test de TDAH:** tu dirección de correo, tu nombre (si lo indicas), el tipo de resultado y tu idioma preferido.`,
          `**Cuando creas una cuenta en la app:** tu correo, tu contraseña (guardada cifrada por nuestro proveedor de infraestructura Supabase) y el contenido que creas — tareas, hábitos, brain dumps, ajustes.`,
        ],
      },
      {
        h2: 'Por qué los recogemos',
        body: [
          `Para entregar los archivos comprados, enviar confirmaciones de pedido, prestar el servicio de la app, enviarte las newsletters a las que te suscribiste y mejorar el producto. También usamos cookies publicitarias y de analítica en el blog — pero solo si las aceptas antes. Consulta **Cookies y publicidad** más abajo.`,
        ],
      },
      {
        h2: 'Quién procesa tus datos',
        body: [
          `Trabajamos con un número reducido de encargados de confianza: **Supabase** (base de datos y autenticación, alojado en la UE), **Vercel** (alojamiento web), **Brevo** (correos transaccionales y newsletters, con sede en la UE) y **WayForPay** (procesamiento de pagos). Cada uno recibe solo los datos necesarios para su función.`,
          `Si das tu consentimiento, dos proveedores más pueden procesar datos en tu navegador: **Google AdSense** (publicidad en el blog) y **Google Analytics** (estadísticas de uso anónimas). Ambos están operados por Google Ireland Limited.`,
        ],
      },
      {
        h2: 'Cuánto tiempo los conservamos',
        body: [
          `Los registros de pedidos se conservan durante el tiempo que exige la contabilidad. Los datos de la newsletter se conservan hasta que te des de baja — cada correo incluye un enlace para hacerlo. Los datos de tu cuenta se conservan hasta que la elimines; puedes exportar todo lo que hayas creado en cualquier momento desde Ajustes.`,
        ],
      },
      {
        h2: 'Tus derechos (RGPD)',
        body: [
          `Si estás en la UE/EEE, tienes derecho a acceder a tus datos personales, rectificarlos, exportarlos o suprimirlos, y a oponerte a su tratamiento o solicitar su limitación. Para ejercer cualquiera de estos derechos, escríbenos a [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}) — respondemos en un plazo de 30 días.`,
        ],
      },
      {
        h2: 'Cookies y publicidad',
        body: [
          `**Las cookies esenciales** están siempre activas: cookies de sesión para el inicio de sesión en la app, tu preferencia de idioma y el registro de la decisión que tomes sobre cookies. Son necesarias para que la web funcione y no te rastrean en ningún otro sitio.`,
          `**Las cookies de analítica** solo se usan con tu consentimiento. Usamos Google Analytics para contar páginas vistas y ver qué artículos se leen de verdad, con la anonimización de IP activada. Lo usamos para decidir de qué escribir más — no para crear un perfil tuyo.`,
          `**Las cookies publicitarias** solo se usan con tu consentimiento. El blog se financia con **Google AdSense**. Cuando permites cookies publicitarias, Google y sus socios pueden instalar y leer cookies en tu dispositivo para mostrar anuncios, limitar cuántas veces ves el mismo anuncio y medir si los anuncios funcionan. Google puede usar estos datos para mostrarte **publicidad personalizada** según tus visitas previas a esta y otras webs.`,
          `Puedes rechazar las cookies publicitarias por completo — el blog sigue siendo totalmente legible, simplemente verás anuncios no personalizados o ninguno. Puedes cambiar o retirar tu decisión cuando quieras con el enlace **Configuración de cookies** en el pie de cada página; retirarla es tan fácil como darla y tiene efecto inmediato.`,
          `Para entender cómo usa Google los datos de las webs que utilizan sus servicios, consulta [Cómo usa Google la información de sitios que utilizan nuestros servicios](${GOOGLE_PARTNER}). También puedes desactivar la publicidad personalizada directamente con Google en [Configuración de anuncios de Google](${GOOGLE_ADS}), leer la [Política de Privacidad de Google](${GOOGLE_PRIVACY}) o rechazar cookies de proveedores externos en [aboutads.info/choices](${ABOUT_ADS}).`,
          `Proveedores externos, incluido Google, usan cookies para mostrar anuncios basados en tus visitas anteriores a esta web o a otras. El uso de cookies publicitarias por parte de Google permite que Google y sus socios te muestren anuncios basados en tu visita a esta web o a otras de internet.`,
        ],
      },
      {
        h2: 'Menores',
        body: [
          `Nuestros productos y nuestra app están dirigidos a personas adultas (mayores de 18 años). No recogemos conscientemente datos de menores.`,
        ],
      },
      {
        h2: 'Contacto',
        body: [
          `Dudas sobre esta política o sobre tus datos: [${CONTACT_EMAIL}](mailto:${CONTACT_EMAIL}). Los datos legales completos del negocio están disponibles a petición.`,
        ],
      },
    ],
  },
}
