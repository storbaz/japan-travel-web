const CACHE_NAME = "japan-travel-v6";
const API_CACHE = "japan-travel-api-v1";
const MAPS_CACHE = "japan-travel-maps-v1";

const PRECACHE_URLS = [
  "/",
  "/phrases",
  "/budget",
  "/events",
  "/food",
  "/transport",
  "/emergency",
  "/weather",
  "/currency",
  "/visa",
  "/packing",
  "/login",
  "/register",
  "/search",
  "/translator",
  "/map",
  "/restaurants",
  "/tips",
  "/favorites",
  "/itineraries",
  "/expenses",
  "/profile",
  "/freaky",
  "/flights",
  "/trip-planner",
  "/seasons",
  "/sports",
  "/culture",
  "/history",
  "/nature",
  "/shopping",
  "/reservations",
  "/jr-pass",
  "/wallet",
  "/authentic",
  "/today",
  "/free-tours",
  "/about",
  "/contact",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== API_CACHE && key !== MAPS_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Google Maps tiles — cache aggressively for offline
  if (
    url.hostname.includes("googleapis.com") &&
    (url.pathname.includes("/maps/") || url.pathname.includes("/tile") || url.pathname.includes("maps.googleapis.com"))
  ) {
    event.respondWith(
      caches.open(MAPS_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            if (response && response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          }).catch(() => new Response("", { status: 503 }));
        })
      )
    );
    return;
  }

  // OpenStreetMap tiles — cache for offline
  if (url.hostname.includes("tile.openstreetmap.org")) {
    event.respondWith(
      caches.open(MAPS_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            if (response && response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          }).catch(() => new Response("", { status: 503 }));
        })
      )
    );
    return;
  }

  // API requests — cache with network-first strategy
  if (request.url.includes("/v1/")) {
    event.respondWith(
      caches.open(API_CACHE).then((cache) =>
        fetch(request)
          .then((response) => {
            if (response && response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cache.match(request))
          .catch(() => new Response(JSON.stringify({ error: "Sin conexion" }), { headers: { "Content-Type": "application/json" } }))
      )
    );
    return;
  }

  // Static pages — cache-first with network fallback
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).catch(() => caches.match("/")))
  );
});
