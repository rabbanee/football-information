const CACHE_NAME = 'fi-v3';
const { assets } = global.serviceWorkerOption

let urlsToCache = [
    ...assets,
    './',
    '/sw.js',
    '/manifest.json',
    '/dist/bundle.js',
    '/dist/index.html',
    '/src/app.js',
    '/matches',
    '/reminders',
    '/src/scripts/components/nav-bar.js',
    '/src/scripts/components/standing-item.js',
    '/src/scripts/components/standing-list.js',
    '/src/scripts/components/pre-loader.js',
    '/src/scripts/components/table-matches.js',
    '/src/scripts/data/data-source.js',
    '/src/scripts/data/db.js',
    '/src/scripts/data/standings.js',
    '/src/scripts/view/home.js',
    '/src/scripts/view/matches.js',
    '/src/scripts/view/reminders.js',
    '/src/css/style.css',
    '/src/img/ball.png',
    '/src/img/ball_bg.png',
    '/src/img/default.png',
];
urlsToCache = urlsToCache.map(path => {
    return new URL(path, global.location).toString()
})

self.addEventListener('install', function (event) {
    event.waitUntil(
        global.caches.open(CACHE_NAME).then(function (cache) {
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
                    return cache.match(event.request)
                        .then(response => {
                            let fetchPromise = fetch(event.request).then(networkResponse => {

                                cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            });
                            return response || fetchPromise;
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
                    if (cacheName !== CACHE_NAME && cacheName.startsWith('fi-')) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    );
});

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: '/src/img/ball_bg.png',
        badge: '/src/img/ball.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Football Information', options)
    );
});
