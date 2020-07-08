require('materialize-css');
require('materialize-css/dist/css/materialize.min.css');
require('./scripts/components/nav-bar.js');
require('material-design-icons/iconfont/material-icons.css');
require('./scripts/components/standing-list.js');
require('./scripts/components/standing-item.js');
require('./scripts/components/pre-loader.js');
require('./css/style.css');

import Navigo from 'navigo';
const $ = require('jquery');
import HomePage from './scripts/view/home.js';
import MatchesPage from './scripts/view/matches.js';
document.addEventListener('DOMContentLoaded', _ => {
    const base_url = 'http://localhost:8080/';
    $('.preloader-background').fadeOut();
    $('.preloader-wrapper').fadeOut();

    var router = new Navigo(base_url);
    router
        .on('/', HomePage)
        .on('/matches', MatchesPage)
        .notFound(HomePage)
        .resolve();

    $(document).on('click', '[data-path]', (e) => {
        e.preventDefault();
        router.navigate($(e.target).attr('href'))
    });

    // REGISTER SERVICE WORKER
    if ("serviceWorker" in navigator) {
        window.addEventListener('load', _ => {
            navigator.serviceWorker
                .register('/sw.js')
                .then(_ => console.log('berhasil!'))
                .catch(_ => {
                    alert('please refresh!')
                });
        });
    }
    else {
        alert('sorry, your browser is not supported in this web! please update/change your browser');
    }
    //active sidebar nav
    // HomePage();
    let sideNav = document.querySelectorAll('.sidenav');

});