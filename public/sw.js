self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('muskan-meat-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/src/assets/muskan-logo.png',
        '/src/assets/hero-meat-shop.jpg',
        // Add other critical assets
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Cache images
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open('images').then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request).then((fetchResponse) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});