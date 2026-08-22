const CACHE_VERSION = "word-tool-pwa-20260822-reading-keyword-v44";
const CORE_CACHE = `${CACHE_VERSION}-core`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./enhanced-word-tool.html",
  "./manifest.webmanifest",
  "./assets/css/enhanced-word-tool.css",
  "./assets/css/preview-redesign.css",
  "./assets/js/modules/word-database.js",
  "./assets/js/modules/import-core.js",
  "./assets/js/modules/game-core.js",
  "./assets/js/modules/statistics-core.js",
  "./assets/js/modules/memory-core.js",
  "./assets/js/modules/story-core.js",
  "./assets/js/enhanced-word-tool.js",
  "./assets/icons/word-cards-180.png",
  "./assets/icons/word-cards-192.png",
  "./assets/icons/word-cards-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CORE_CACHE)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CORE_CACHE && key !== RUNTIME_CACHE && key !== IMAGE_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

function shouldRuntimeCache(request) {
  const url = new URL(request.url);
  if (request.method !== "GET") return false;
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;

  const cacheableExtensions = /\.(?:css|js|png|jpg|jpeg|webp|svg|gif|mp3|m4a|wav|ogg|woff2?|ttf|json|webmanifest)$/i;
  return url.origin === self.location.origin
    || cacheableExtensions.test(url.pathname)
    || url.hostname.includes("cdn.jsdelivr.net")
    || url.hostname.includes("cdnjs.cloudflare.com");
}

function isImageRequest(request) {
  if (request.destination === "image") return true;
  try {
    return /\.(?:png|jpg|jpeg|webp|avif|svg|gif)$/i.test(new URL(request.url).pathname);
  } catch (error) {
    return false;
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;

  const response = await fetch(request);
  if (response && (response.ok || response.type === "opaque")) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
  }
  return response;
}

async function imageCacheFirst(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) {
    fetch(request)
      .then((response) => {
        if (response && (response.ok || response.type === "opaque")) {
          cache.put(request, response.clone());
        }
      })
      .catch(() => {});
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response && (response.ok || response.type === "opaque")) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return caches.match("./assets/icons/word-cards-192.png");
  }
}

async function networkFirstHtml(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CORE_CACHE);
    cache.put("./enhanced-word-tool.html", response.clone());
    return response;
  } catch (error) {
    return caches.match("./enhanced-word-tool.html");
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstHtml(request));
    return;
  }

  if (isImageRequest(request)) {
    event.respondWith(imageCacheFirst(request));
    return;
  }

  if (shouldRuntimeCache(request)) {
    event.respondWith(cacheFirst(request));
  }
});
