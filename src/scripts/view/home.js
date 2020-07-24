import 'regenerator-runtime/runtime';
const DataSource = require('../data/data-source.js').default;
const $ = require('jquery');
const { compile } = require('handlebars');
const template = require('../../html/home.handlebars');

const home = _ => {
    $('#app').html(compile(template)());
    $('.preloader-background').fadeOut();
    $('.preloader-wrapper').fadeOut();

    const league = document.querySelectorAll('ul#select-league li a');
    const standingListElement = document.querySelector('standing-list');
    const entryElement = document.querySelector('#entry');


    [...league].forEach(e => {
        e.addEventListener('click', function (event) {
            event.preventDefault();
            // Function handler selected League
            $('.preloader-background').fadeIn('fast');
            $('.preloader-wrapper').fadeIn('fast');

            selectedLeague(this.getAttribute('data-id'));
        })
    });

    function selectedLeague(standingId) {
        DataSource.getStandingsById(standingId)
            .then(renderResult)
            .catch(renderError)
    }

    function renderError(error) {
        standingListElement.error = error;
        $('.preloader-background').fadeOut('fast');
        $('.preloader-wrapper').fadeOut('fast');
    }

    function renderResult(results) {
        standingListElement.standings = results;
        $('.preloader-background').fadeOut('fast');
        $('.preloader-wrapper').fadeOut('fast');
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