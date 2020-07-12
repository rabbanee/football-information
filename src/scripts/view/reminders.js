const $ = require('jquery');
const DB = require('../data/db.js').default;
const DataSource = require('../data/data-source.js').default;
const { compile } = require('handlebars');
const template = require('../../html/reminders.handlebars');
const BASE_URL = 'https://api.football-data.org/v2/';
const swal = require('sweetalert');
const reminders = _ => {
    $('#app').html(compile(template)())
    $('.preloader-background').fadeOut('fast');
    $('.preloader-wrapper').fadeOut('fast');
    let db = new DB();

    function fetchTeamById(id) {
        return DataSource.getTeamById(id)
            .then(response => response.crestUrl)
            .catch(error => 'null')
    }

    document.addEventListener('click', el => {
        if (el.target.classList.contains('reminders') && el.target.classList.contains('btn-reminder')) {
            removeFromReminders(parseInt(el.target.getAttribute('data-id')))
        }
    })

    function removeFromReminders(id) {
        db.removeFromReminders(id)
            .then(_ => {
                cancelScheduledNotification(id);
                swal("Success to remove", "The match has been removed from reminders!", "success")
                    .then(_ => location.reload())
            })
    }

    const cancelScheduledNotification = async (tag) => {
        const registration = await navigator.serviceWorker.getRegistration();
        const notifications = await registration.getNotifications({
            tag: tag,
            includeTriggered: true,
        });
        notifications.forEach((notification) => notification.close());
    };

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    db.getAll().then(async reminders => {
        const tableMatchesElement = document.createElement('table-matches');
        const containerElement = document.querySelector('#entry');

        await asyncForEach(reminders, async reminder => {
            if ('caches' in window) {
                // away
                await caches.match(`${BASE_URL}teams/${reminder.awayTeam.id}`)
                    .then(async response => {
                        if (response) {
                            await response.json().then(result => {
                                reminder.awayTeam['crestUrl'] = result.crestUrl;
                            })

                        } else {
                            reminder.awayTeam['crestUrl'] = await fetchTeamById(reminder.awayTeam.id)
                        }
                    })

                //home
                await caches.match(`${BASE_URL}teams/${reminder.homeTeam.id}`)
                    .then(async response => {
                        if (response) {
                            await response.json().then(result => {
                                reminder.homeTeam['crestUrl'] = result.crestUrl;
                            })

                        } else {
                            reminder.homeTeam['crestUrl'] = await fetchTeamById(reminder.homeTeam.id)
                        }
                    })
            } else {
                reminder.awayTeam['crestUrl'] = await fetchTeamById(reminder.awayTeam.id)
                reminder.homeTeam['crestUrl'] = await fetchTeamById(reminder.homeTeam.id)
            }

        });

        let result = {
            matches: reminders
        }

        tableMatchesElement.matches = result;
        tableMatchesElement.button = 'Remove from Reminders';
        containerElement.appendChild(tableMatchesElement);
        $('.preloader-background').fadeOut('fast');
        $('.preloader-wrapper').fadeOut('fast');
    })
}
export default reminders;