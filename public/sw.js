// Minimal service worker — its only job is to make bloom focus installable as a
// PWA. It deliberately does NOT cache anything, so a fresh deploy is never
// served stale. The empty fetch listener is enough to satisfy installability.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
self.addEventListener('fetch', () => { /* pass-through, no interception */ })
