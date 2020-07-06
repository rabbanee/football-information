const DataSource = require('../data/data-source.js').default;
const Standings = require('../data/standings.js').default;
const $ = require('jquery');
const { compile } = require('handlebars');

const template = require('../../html/home.handlebars');

const home = _ => {
    console.log('from home');
    Standings.forEach(standing => {
        if ('caches' in window) {
            let base_url = 'https://api.football-data.org/v2/';
            caches.match(`${base_url}competitions/${standing.id}/standings`)
                .then(response => {
                    if (response) {
                        response.json().then(renderResult)
                    } else {
                        DataSource.getStandingsById(standing.id)
                            .then(renderResult)
                            .catch(msg => console.log(msg))
                    }
                })
        } else {
            DataSource.getStandingsById(standing.id)
                .then(renderResult)
                .catch(msg => console.log(msg))
        }

    });

    function renderResult(result) {
        const standingItemElement = document.createElement('standing-item');
        standingItemElement.standing = result;
        document.querySelector('main .container').appendChild(standingItemElement);
        let tabs = document.querySelector('.tabs');
        M.Tabs.init(tabs, {
            swipeable: true,
            onShow: resizeTab
        });
        $(window).resize(function () { resizeTab(); });
        function resizeTab() {
            $(".tabs-content").css('height', $('.carousel-item.active').height() + 'px');
        }
    }
    let user = 'Jonh'

    $('#app').html(compile(template)({
        user,
    }))
    // const standingListElement = document.createElement('standing-list');
    // document.querySelector('main .container').appendChild(standingListElement);
}
export default home;