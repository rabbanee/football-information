require('materialize-css');
require('materialize-css/dist/css/materialize.min.css');
require('./scripts/components/nav-bar.js');
require('material-design-icons/iconfont/material-icons.css');
require('./scripts/components/standing-list.js');
require('./scripts/components/standing-item.js');
require('./css/style.css');

import Navigo from 'navigo';
const $ = require('jquery');
import HomePage from './scripts/view/home.js';
import TeamPage from './scripts/view/team.js';
document.addEventListener('DOMContentLoaded', _ => {
    var router = new Navigo();
    router
        .on('/ss', _ => console.log('ada nih'))
        .on('/team', () => console.log('ada nih'))
        .notFound(_ => console.log('error cuy'))
        .resolve();
    console.log(router);

    $(document).on('click', '[data-path]', (e) => {
        e.preventDefault()
        router.navigate($(e.target).attr('href'))
        console.log(router);
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