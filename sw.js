const cacheName = 'rr-v1';
const cachedFiles = [
  './',
  './data/restaurants.json',
  './js/dbhelper.js',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './js/restaurant_info.js',
  './js/main.js'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function (cache) {
        return cache.addAll(cachedFiles);
      })
  )
})

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (thisCacheName) {
          if (thisCacheName !== cacheName) {
            return caches.delete(thisCacheName);
          }
        }))
      })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }

        const requestClone = event.request.clone();
        fetch(requestClone)
          .then(function (response) {
            if (!response) {
              return response;
            }

            const responseClone = response.clone();
            caches.open(cacheName)
              .then(function (cache) {
                cache.put(event.request, responseClone);
                return response;
              })
          })
          .catch(function (err) {
            console.log('Error fetching', err)
          })
      })
  )
});
