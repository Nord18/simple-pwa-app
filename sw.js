const cacheName = 'v1';

const DynamicCache = 'dynamic-v1';

const urlToCaches = [
    '/',
    '/manifest.json',
    '/index.html',
    '/dist/main.css',
    '/dist/build.js',
    'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons',
    '/dist/assets/favicon.png',
    '/dist/assets/icon-192x192.png',
    '/dist/assets/icon-512x512.png'
];

self.addEventListener('install', evt => {
    // console.log('install')
    evt.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(urlToCaches)
            })
    )
});
self.addEventListener('activate', evt => {
    // console.log('activate')
    evt.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => {
                        return key !== cacheName
                    }).map(key => {
                        return caches.delete(key)
                    })
                )
            })
    )
});
self.addEventListener('fetch', evt => {
    // console.log('fetch events', evt)
    if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
        evt.respondWith(
            caches.match(evt.request)
                .then(response => {
                    return response || fetch(evt.request)
                        .then(response => {
                            return caches.open(DynamicCache).then(cache => {
                                cache.put(evt.request.url, response.clone());
                                return response
                            })
                        })
                })
        )
    }
})