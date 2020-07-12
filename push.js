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
    'endpoint': 'https://fcm.googleapis.com/fcm/send/ceNxKGC67bE:APA91bHI0EyBEYxciD_5AwJPoshoMSARfq8spzt1LIhvalXfJMSPMK2kcvki6e_AeA-ZuZbNHObftLFId9wuUM3_ulOSUOTKtK9aEdvEMpdqajzOc473uVT0wBf_A2Bxju_QpQzdHIFI',
    'keys': {
        'p256dh': 'BG4PQWRO2zoVrL2LCdzz4gQjIFZ7WZ0QnKA1WN/hNQbZAROVRn8e3b1zvVVhIbMjIDMsyeW5Ae7NdGuhBf/ado4=',
        'auth': 'lLXjfDAh+crk4s42YOm9lw=='
    }
}

let payload = 'Selamat! Aplikasi anda sudah dapat menerima push notifikasi!';

let options = {
    gcmAPIKey: '496418037762',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);

