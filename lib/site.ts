/**
 * Single source of truth for site-wide constants.
 *
 * The public contact address was previously split: hello@bloomfocus.org in the
 * legal pages and as the Brevo sender for every transactional email, versus
 * hello.bloomfocus@gmail.com in the footer and order-success page. The domain
 * address wins — it already sends all transactional mail, it is what the Privacy
 * Policy and Terms commit to for GDPR and order support, and a domain-matched
 * address reads as more legitimate during AdSense review.
 *
 * Changing it here changes it everywhere it is shown to a visitor.
 */
export const CONTACT_EMAIL = 'hello@bloomfocus.org'

/** Canonical origin, used for canonical URLs, hreflang and the sitemap. */
export const SITE_URL = 'https://bloomfocus.org'
