importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox) {
    workbox.precaching.precacheAndRoute([
        { url: 'index.html', revision: '1' },
        { url: '/matches', revision: '1' },
        { url: '/reminders', revision: '1' },
        { url: '/src/scripts/components/nav-bar.js', revision: '1' },
        { url: '/src/scripts/components/standing-item.js', revision: '1' },
        { url: '/src/scripts/components/standing-list.js', revision: '1' },
        { url: '/src/scripts/components/pre-loader.js', revision: '1' },
        { url: '/src/scripts/components/table-matches.js', revision: '1' },
        { url: '/src/scripts/data/data-source.js', revision: '1' },
        { url: '/src/scripts/data/db.js', revision: '1' },
        { url: '/src/scripts/view/home.js', revision: '1' },
        { url: '/src/scripts/view/matches.js', revision: '1' },
        { url: '/src/scripts/view/reminders.js', revision: '1' },
        { url: '/src/img/ball.png', revision: '1' },
        { url: '/src/img/ball_bg.png', revision: '1' },
        { url: '/src/img/default.png', revision: '1' },
    ], {
        ignoreURLParametersMatching: [/.*/]
    })
    workbox.routing.registerRoute(
        new RegExp('/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'home'
        })
    );

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'football-api',
            ignoreURLParametersMatching: [/.*/]
        })
    );
} else {
    console.log('Workbox gagal dimuat');
}
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