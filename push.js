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
    'endpoint': 'https://fcm.googleapis.com/fcm/send/c6-y3L67zqc:APA91bH__9TzLEwxAjTnek5UfLhZsb7FgDvXaSMhP5Bii0R7jdF_vOKQc5ZH9RABhLvW55muL6oJXlx6L1Ugv_jI2ZHVuzFShGTQ19RjmlhCygNq8JHdgyTzNfSX35VyKz2K-lJVF6_8',
    'keys': {
        'p256dh': 'BIH0b8KxgvrnH6eZAhKJLaOPYzHBiUUd7kmVuHDrpVM7fIXq95lbmWdbKwMC5Ora40GIr2szxHiNJwKmhxXRL6s=',
        'auth': 'NUf32b5BfOWDgancRmcmRg=='
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

