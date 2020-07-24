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
    'endpoint': 'https://fcm.googleapis.com/fcm/send/f2V664xVxhY:APA91bF0icK9-7AIdmdfUgaSa2_bk3aTQ_UX8I-iNc3wjYu4Fe2LAhzmrGTsTLNjHNxdJCMoFXui8lie9vop20sQqot15mdrMv09E8KonY4JAFk9a3SiVnoqnec4yPyhkaHL3pKs_3wN',
    'keys': {
        'p256dh': 'BDSYMM937gyiJphDnkHfQMJQxPbTclXVaMylyj8AhkzMF/1aMztqZZd8NJnBNiOLhvt+EB6dwHfF6D56V6cmZoY=',
        'auth': 'k8MqTLSN0Uzgx+mVUQ1GtQ=='
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

