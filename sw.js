const CACHE_NAME = 'fi-v2';
let urlsToCache = [
    '/',
    '/sw.js',
    '/manifest.json',
    '/bundle.js',
    '/dist/bundle.js',
    '/dist/index.html',
    '/src/app.js',
    '/src/html/app.ejs',
    '/src/html/home.handlebars',
    '/src/html/matches.handlebars',
    '/src/html/reminders.handlebars',
    '/src/scripts/components/nav-bar.js',
    '/src/scripts/components/standing-item.js',
    '/src/scripts/components/standing-list.js',
    '/src/scripts/data/data-source.js',
    '/src/scripts/data/standings.js',
    '/src/scripts/view/home.js',
    '/src/scripts/view/matches.js',
    '/src/scripts/view/reminders.js',
    '/src/css/style.css',
    '/src/img/ball.png',
    '/src/img/ball_bg.png',
    '/src/img/default.png',
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
                    return cache.match(event.request)
                        .then(response => {
                            let fetchPromise = fetch(event.request).then(networkResponse => {

                                cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            });
                            // console.log(fetch(event.request));
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
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

// self.addEventListener('push', event => {
//     console.log('i am pushed');
//     let body;
//     if (event.data) {
//         body = event.data.text();
//     } else {
//         body = 'Push message no payload';
//     }
//     console.log(new TimestampTrigger(new Date().getTime() + 5 * 1000));
//     let options = {
//         body: body,
//         icon: '/src/img/default.png',
//         vibrate: [100, 50, 100],
//         showTrigger: new TimestampTrigger(new Date().getTime() + 5 * 1000),
//         data: {
//             dateOfArrival: Date.now(),
//             primaryKey: 1
//         }
//     };

//     event.waitUntil(
//         self.registration.showNotification(`Push Notification ${time}`, options)
//     );
// });