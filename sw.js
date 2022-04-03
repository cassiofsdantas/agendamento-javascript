const cacheName = "agendamento-de-clientes-v0.0.4";
var precacheFiles = [
  '/index.html',
  '/history.html',
  '/register.html',
  '/css/styles.css',
  '/javascripts/reloadpagestyles.js',
  '/javascripts/serviceworkerstarter.js',
  '/javascripts/utils.js',
  '/javascripts/register.js',
  '/models/schedule.js',
  '/templates/cards/card.css',
  '/templates/cards/card.html',
  '/templates/cards/card.js',
  '/templates/header/header.css',
  '/templates/header/header.html',
  '/templates/header/header.js',
];

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) {
  let resposta = caches.open(cacheName).then((cache) => {
    return cache.match(event.request).then((recurso) => {
      if (recurso) return recurso;

      try {
          return fetch(event.request).then((recurso) => {
            cache.put(event.request, recurso.clone());
            return recurso;
          });
      } catch (error) {
        console.log(event);
        console.log(recurso);
        return recurso
      }
    });
  });
  event.respondWith(resposta);
});

self.addEventListener('install', function (event) {
  self.skipWaiting();

  event.waitUntil(
  caches.open(cacheName).then((cache) => {
    return cache.addAll(precacheFiles);
  }));
});