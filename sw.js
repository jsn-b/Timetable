const CACHE_NAME = 'jarvis-timetable-v1';
const urlsToCache = [
  'Timetable/',
  'Timetable/index.html',
  'Timetable/style.css',
  'Timetable/script.js',
  'Timetable/icon-192.png',
  'Timetable/icon-512.png',
  'Timetable/font.otf',
  
];

// Install the service worker and cache the app's shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});