let webPush = require('web-push');

const vapidKeys = {
    'publicKey': 'BOml4-PG4mZ2RTyTBRQ1hPNy8SMhVJwMhu2rX94V_Yvv-wSHp7Rmacxo76Y51cQ1GJgLBJJlxlZTOBcfwTPtrgc',
    'privateKey': 'VQqnVIADCk3Q_E7XJ_Uids4jVeTzLz0efK5YdfqyElk'
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

let pushSubscription = {
    'endpoint': 'https://fcm.googleapis.com/fcm/send/dthRMzmZFUQ:APA91bGh5dwX5M_liYPqHbUetNb8fRiwZiCJU0patk7E2CaZXykh1vb1V_cxQF-cockHdbEpyjRjILmqYm4hFCRZdRQtRGK6s2cPozpJ8yt2rzegJd1k_pUpnOpMPHvrDG4zUCzTzpUt',
    'keys': {
        'p256dh': 'BKm3NDwHkQXBtLTtRDEHl9xXoXgRfl0kqS4Q+RVFB1elfuhxJD/4amG0s34vIhwzVAjon/Ou+t7GdbpuLPznMQk=',
        'auth': 'G7FOosGC9ueZAPG6KkVqow=='
    }
}

let payload = 'Let\'s check Matches today! ';

let options = {
    gcmAPIKey: '496418037762',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);

