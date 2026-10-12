// Service worker: lets the archive open offline after the first visit.
// Bump VERSION whenever you update the data files to force a refresh.
const VERSION = "ob-archive-v9";
const CORE = [
  "./",
  "./index.html",
  "./database/cookies.js",
  "./database/pets.js",
  "./database/treasures.js",
  "./manifest.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first (so edits show up), fall back to cache when offline.
// Wiki images (cross-origin) are cached too, so sprites work offline.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    fetch(req, new URL(req.url).origin === self.location.origin ? { cache: "no-cache" } : undefined)
      .then((res) => {
        if (res && (res.ok || res.type === "opaque")) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
  );
});