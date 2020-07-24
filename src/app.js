require('materialize-css');
require('materialize-css/dist/css/materialize.min.css');
require('./scripts/components/nav-bar.js');
require('material-design-icons/iconfont/material-icons.css');
require('./scripts/components/standing-list.js');
require('./scripts/components/standing-item.js');
require('./scripts/components/pre-loader.js');
require('./scripts/components/table-matches.js');
require('./css/style.css');
require('moment');
require('sweetalert');
const Navigo = require('navigo');
const $ = require('jquery');
const MatchesPage = require('./scripts/view/matches.js').default;
const HomePage = require('./scripts/view/home.js').default;
const RemindersPage = require('./scripts/view/reminders.js').default;
const router = new Navigo();

document.addEventListener('DOMContentLoaded', _ => {
    console.log('kesini');
    router
        .on('/', HomePage)
        .on('/matches', MatchesPage)
        .on('/reminders', RemindersPage)
        .notFound(HomePage)
        .resolve();
    $(document).on('click', '[data-path]', (e) => {
        e.preventDefault();
        router.navigate($(e.target).attr('href'))
    });


    function registerServiceWorker() {
        return navigator.serviceWorker
            .register('/sw.js')
            .then(_ => console.log('registrasi service worker berhasil!'))
            .catch(_ => {
                console.error('Registrasi service worker gagal.', err);
            });
    }




    // REGISTER SERVICE WORKER
    if ("serviceWorker" in navigator) {
        registerServiceWorker();
        function urlBase64ToUint8Array(base64String) {
            const padding = `=`.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }
        requestPermission();
        // Meminta ijin menggunakan Notification API
        function requestPermission() {
            Notification.requestPermission().then(function (result) {
                if (result === "denied") {
                    return;
                } else if (result === "default") {
                    return;
                }
                if (('PushManager') in window) {
                    navigator.serviceWorker.getRegistration().then(registration => {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array('BOml4-PG4mZ2RTyTBRQ1hPNy8SMhVJwMhu2rX94V_Yvv-wSHp7Rmacxo76Y51cQ1GJgLBJJlxlZTOBcfwTPtrgc'),
                        }).then(subscribe => {
                            console.log(`Berhasil melakukan subscribe dengan endpoint ${subscribe.endpoint}`);
                            console.log(`Berhasil melakukan subscribe dengan p256dh key ${btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh'))))}`);
                            console.log(`Berhasil melakukan subscribe dengan auth key ${btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth'))))}`);

                        }).catch(e => console.log(`Tidak dapat melakukan subscribe ${e.message}`))
                    })
                }
                console.log("Fitur notifikasi diijinkan.");
            });
        }

    }
    else {
        alert('sorry, your browser is not supported in this web! please update/change your browser');
    }

    //active sidebar nav
    let sideNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNav);
});