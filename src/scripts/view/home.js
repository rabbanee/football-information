const DataSource = require('../data/data-source.js').default;
const $ = require('jquery');
const { compile } = require('handlebars');
const template = require('../../html/home.handlebars');

const home = _ => {
    $('#app').html(compile(template)());

    const league = document.querySelectorAll('ul#select-league li a');
    const standingListElement = document.querySelector('standing-list');

    [...league].forEach(e => {
        e.addEventListener('click', function () {
            // Function handler selected League
            $('.preloader-background').fadeIn('fast');
            $('.preloader-wrapper').fadeIn('fast');

            selectedLeague(this.getAttribute('data-id'));
        })
    });

    function selectedLeague(standingId) {
        if ('caches' in window) {
            let base_url = 'https://api.football-data.org/v2/';
            caches.match(`${base_url}competitions/${standingId}/standings`)
                .then(response => {
                    if (response) {
                        response.json().then(renderResult)
                    } else {
                        DataSource.getStandingsById(standingId)
                            .then(renderResult)
                            .catch(msg => console.log(msg))
                    }
                })
        } else {
            DataSource.getStandingsById(standingId)
                .then(renderResult)
                .catch(msg => console.log(msg))
        }
    }

    function renderResult(results) {
        $('.preloader-background').fadeOut('fast');

        $('.preloader-wrapper').fadeOut('fast');
        standingListElement.standings = results;
    }

    document.addEventListener('click', function (e) {
        let target = e.target;
        if (target.classList.contains('team')) {
            e.preventDefault();
        }
    });

    let dropDownTrigger = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropDownTrigger);

}
export default home;