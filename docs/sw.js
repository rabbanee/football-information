var serviceWorkerOption = {
  "assets": [
    "/MaterialIcons-Regular.4674f8d.eot",
    "/MaterialIcons-Regular.cff684e.woff2",
    "/MaterialIcons-Regular.83bebaf.woff",
    "/MaterialIcons-Regular.5e7382c.ttf",
    "/bundle.js",
    "/index.html",
    "/manifest.json",
    "/src/img/ios/icon_1024x1024.83a2db6e7923a0ed1e897a41fe38e0a3.png",
    "/src/img/ios/icon_180x180.67f0bc31ea4ec67a72b5d3f40132931d.png",
    "/src/img/ios/icon_167x167.f782fdd3d1d54dae26c23eb61b3453c1.png",
    "/src/img/ios/icon_152x152.3d133794f4237f287d9a468cbbdb8060.png",
    "/src/img/ios/icon_120x120.d5f0205756f80791c5db9477d41d8d0d.png",
    "/src/img/android/icon_512x512.867ef639dae1afac051f304be7a2be01.png",
    "/src/img/android/icon_384x384.827d30d33bf386b938cf39587a867fed.png",
    "/src/img/android/icon_256x256.c942da103499c81bdc5ba522edaef165.png",
    "/src/img/android/icon_192x192.ee27dc644f35d62ad9df8ba0cb0be165.png",
    "/src/img/android/icon_128x128.6b7b14e13a7fd90facd3f29dc8cc96f3.png",
    "/src/img/android/icon_96x96.71f405cde936026e0b0258fce5297a17.png"
  ]
};
        
        !function(e){var r={};function t(o){if(r[o])return r[o].exports;var i=r[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var i in e)t.d(o,i,function(r){return e[r]}.bind(null,i));return o},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="/mpwa-submission-3",t(t.s=0)}([function(e,r){importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"),workbox?(workbox.precaching.precacheAndRoute([{url:"index.html",revision:"1"},{url:"/matches",revision:"1"},{url:"/reminders",revision:"1"},{url:"/src/scripts/components/nav-bar.js",revision:"1"},{url:"/src/scripts/components/standing-item.js",revision:"1"},{url:"/src/scripts/components/standing-list.js",revision:"1"},{url:"/src/scripts/components/pre-loader.js",revision:"1"},{url:"/src/scripts/components/table-matches.js",revision:"1"},{url:"/src/scripts/data/data-source.js",revision:"1"},{url:"/src/scripts/data/db.js",revision:"1"},{url:"/src/scripts/view/home.js",revision:"1"},{url:"/src/scripts/view/matches.js",revision:"1"},{url:"/src/scripts/view/reminders.js",revision:"1"},{url:"/src/img/ball.png",revision:"1"},{url:"/src/img/ball_bg.png",revision:"1"},{url:"/src/img/default.png",revision:"1"}],{ignoreURLParametersMatching:[/.*/]}),workbox.routing.registerRoute(new RegExp("/"),workbox.strategies.staleWhileRevalidate({cacheName:"home"})),workbox.routing.registerRoute(new RegExp("https://api.football-data.org/v2/"),workbox.strategies.staleWhileRevalidate({cacheName:"football-api",ignoreURLParametersMatching:[/.*/]}))):console.log("Workbox gagal dimuat"),self.addEventListener("push",(function(e){var r={body:e.data?e.data.text():"Push message no payload",icon:"/src/img/ball_bg.png",badge:"/src/img/ball.png",vibrate:[100,50,100],data:{dateOfArrival:Date.now(),primaryKey:1}};e.waitUntil(self.registration.showNotification("Football Information",r))}))}]);