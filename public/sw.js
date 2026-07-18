const CACHE_NAME = "japan-travel-v2";
const API_CACHE = "japan-travel-api-v1";

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
          .filter((key) => key !== CACHE_NAME && key !== API_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

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

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).catch(() => caches.match("/")))
  );
});
