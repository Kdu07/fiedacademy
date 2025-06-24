const CACHE_NAME = "fieldacademy-v1";

// Recursos para cache inicial
const STATIC_ASSETS = [
  "/",
  "/help",
  "/css/style.css",
  "/images/logo.png",
  "/js/subject.js",
  "/css/body.css",
  "/data/",
];

// Recurso para página de ajuda
const HELP_ASSETS = [
  "/help",
  // Imagens usadas na página de ajuda
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
  "https://images.unsplash.com/photo-1591154669695-5f2a8d20c089",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
];

// Instalação do Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log("Cache de recursos estáticos criado");
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open("help-cache").then((cache) => {
        console.log("Cache da página de ajuda criado");
        return cache.addAll(HELP_ASSETS);
      }),
    ]).then(() => self.skipWaiting())
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== "help-cache")
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Estratégia de fetch: Cache First, depois Network
self.addEventListener("fetch", (event) => {
  // Ignorar requisições não GET
  if (event.request.method !== "GET") return;

  // Ignorar requisições para outros domínios exceto unsplash (para as imagens)
  const url = new URL(event.request.url);
  if (
    url.origin !== self.location.origin &&
    !url.hostname.includes("unsplash.com") &&
    !url.hostname.includes("css.com")
  ) {
    return;
  }

  // Se for requisição para a página de ajuda
  if (url.pathname === "/help") {
    event.respondWith(
      caches.match("/help").then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Se a resposta for válida, atualiza o cache
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open("help-cache").then((cache) => {
                cache.put(event.request, clone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Retornar uma página offline customizada para /help
            return caches.match("/help-offline");
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Para outras requisições
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          // Se a resposta for válida, adiciona ao cache
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return networkResponse;
        })
        .catch((error) => {
          // Verificar se é uma requisição de página HTML
          if (event.request.headers.get("Accept").includes("text/html")) {
            console.warn("Erro ao buscar recurso:", event.request.url, error);
            return caches.match("/offline.html");
          }
          throw error;
        });
    })
  );
});
