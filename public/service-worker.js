// Default cache configuration (fallback if loading fails)
let CACHE_CONFIG = {
  pages: ["/", "/help"],
  assets: [
    "/css/style.css",
    "/images/logo.png",
    "/images/favicon.ico",
    "/js/loadServiceWorker.js",
    "/js/offline-detector.js",
    "/offline.html",
  ],
  version: "v3",
};

const CACHE_NAME = "fieldacademy-" + (CACHE_CONFIG.version || "v3");
const HELP_CACHE = "help-cache-v1";

// Load configuration from external file
async function loadCacheConfig() {
  try {
    console.log("[SW] Loading cache configuration...");
    const response = await fetch("/cache-config.json");
    if (!response.ok) {
      throw new Error(`Failed to load cache config: ${response.status}`);
    }

    CACHE_CONFIG = await response.json();
    console.log("[SW] Cache configuration loaded successfully:", CACHE_CONFIG);
  } catch (error) {
    console.warn(
      "[SW] Error loading cache configuration, using defaults:",
      error
    );
  }
}

async function isOnline() {
  return typeof navigator !== 'undefined' && navigator.onLine === true;
}

// Install event - pre-cache pages and assets
self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing...");

  // Load config and then cache assets
  event.waitUntil(
    loadCacheConfig()
      .then(() => cachePages())
      .then(() => {
        console.log("[Service Worker] Pre-caching complete");
        return self.skipWaiting();
      })
  );

  async function cachePages() {
    // Skip caching if offline
    if (!isOnline()) {
      console.log("[SW] Browser is offline, skipping pre-caching");
      return Promise.resolve();
    }

    const cache = await caches.open(CACHE_NAME);

    // First cache static assets
    console.log("[SW] Caching static assets:", CACHE_CONFIG.assets);
    await Promise.all(
      CACHE_CONFIG.assets.map((url) =>
        cache
          .add(url)
          .catch((err) => console.warn(`[SW] Failed to cache ${url}:`, err))
      )
    );

    // Then pre-cache HTML pages
    console.log("[SW] Caching pages:", CACHE_CONFIG.pages);
    return Promise.all(
      CACHE_CONFIG.pages.map((url) =>
        fetch(url)
          .then((response) => {
            if (response.status === 200) {
              return cache.put(url, response);
            }
            console.warn(
              `[SW] Failed to fetch ${url}: status ${response.status}`
            );
          })
          .catch((err) => console.warn(`[SW] Failed to pre-fetch ${url}:`, err))
      )
    );
  }
});

// Activate event
self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== HELP_CACHE)
            .map((name) => {
              console.log("[Service Worker] Deleting old cache:", name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log("[Service Worker] Claiming clients");
        return self.clients.claim();
      })
  );
});

// Fetch event - improved strategy for HTML pages
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Better handling for HTML navigation requests
  if (
    event.request.mode === "navigate" ||
    event.request.headers.get("Accept")?.includes("text/html")
  ) {
    console.log("[SW] HTML request:", url.pathname);

    // Special handling for the help page
    if (url.pathname === "/help" || url.pathname === "/help/") {
      console.log("[SW] Help page request");

      event.respondWith(
        // Try cache first for the help page
        caches.match(new Request("/help")).then((cachedResponse) => {
          if (cachedResponse) {
            console.log("[SW] Serving help page from cache");
            return cachedResponse;
          }

          // If not in cache, try network
          console.log("[SW] Help page not in cache, trying network");
          return fetch(event.request)
            .then((networkResponse) => {
              // Cache the response for next time
              if (networkResponse.ok) {
                const clonedResponse = networkResponse.clone();
                caches
                  .open(CACHE_NAME)
                  .then((cache) => cache.put("/help", clonedResponse));
              }
              return networkResponse;
            })
            .catch((error) => {
              console.warn("[SW] Network failed for help page:", error);
              // If all else fails, show the offline page
              return caches
                .match("/offline.html")
                .then(
                  (offlineResponse) =>
                    offlineResponse || Response.redirect("/offline.html")
                );
            });
        })
      );
      return;
    }

    // For other HTML requests, try network first
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache successful responses for next time
          if (response.status === 200 && isOnline()) {
            const clonedResponse = response.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(event.request, clonedResponse));
          }
          return response;
        })
        .catch(() => {
          console.log("[SW] Network failed, trying cache");
          // If network fails, try from cache
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // If not in cache, show offline page
            return caches
              .match("/offline.html")
              .then(
                (offlineResponse) =>
                  offlineResponse || Response.redirect("/offline.html")
              );
          });
        })
    );
    return;
  }

  // For non-HTML resources, use cache-first strategy
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const clonedResponse = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clonedResponse));
        }
        return response;
      });
    })
  );
});

// Skip waiting when asked
self.addEventListener("message", (event) => {
  if (event.data && event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
