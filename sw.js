const CACHE_NAME = 'fi-v1';
let urlsToCache = [
    '/',
    '/sw.js',
    '/dist/bundle.js',
    '/dist/index.html',
    '/src/app.js',
    '/src/html/index.html',
    '/src/scripts/components/nav-bar.js',
    '/src/scripts/components/standing-item.js',
    '/src/scripts/components/standing-list.js',
    '/src/scripts/data/data-source.js',
    '/src/scripts/data/standings.js',
    '/src/scripts/view/home.js',
    '/src/css/style.css',
];


self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    )
});


self.addEventListener('fetch', event => {
    let base_url = 'https://api.football-data.org/v2/';

    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME)
                .then(cache => {
                    return fetch(event.request).then(response => {
                        cache.put(event.request.url, response.clone());
                        return response;
                    })
                })
        )
    } else {
        event.respondWith(
            caches
                .match(event.request)
                .then(function (response) {
                    return response || fetch(event.request)
                })
        )
    }

});


self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME && cacheName.startsWith('fi')) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
});