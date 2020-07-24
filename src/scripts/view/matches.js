const $ = require('jquery')
const { compile } = require('handlebars');
const template = require('../../html/matches.handlebars');
const DataSource = require('../data/data-source.js').default;
const DB = require('../data/db.js').default;
const swal = require('sweetalert');
const moment = require('moment');

function matches() {
    const db = new DB();

    $('#app').html(compile(template)())
    const BASE_URL = 'https://api.football-data.org/v2/';

    fetchMatchesByStatus('SCHEDULED')

    document.addEventListener('click', async function (e) {
        let target = e.target;
        if (target.classList.contains('btn-reminder') && target.classList.contains('matches')) {
            // Periksa fitur Notification API
            if ("Notification" in window) {
                let status = '';
                try {
                    status = await requestPermission();

                } catch (error) {
                    status = error;
                }
                console.log(status);
                if (status === 'granted') {
                    let dataId = target.getAttribute('data-id');
                    DataSource.getMatchByIdAndStatus(dataId)
                        .then(async result => {
                            let results = await addCrestUrl({
                                matches: [result]
                            });
                            if ("showTrigger" in Notification.prototype) {
                                results.matches.forEach(result => {
                                    createScheduledNotification(dataId, `${result.awayTeam.name} vs ${result.homeTeam.name}`, new Date(result.utcDate));
                                });
                                db.remindToWatch(result)
                                    .then(_ => {
                                        target.classList.add('disabled');
                                        target.innerHTML = 'Reminded';
                                        swal("Success", "The reminder will remind the match!", "success");
                                    })
                                    .catch(_ => swal("Failed", "The match has been added to reminder!", "error"))
                            }
                        }).catch(err => console.log(err))
                } else {
                    swal("Failed", "Please allow the notification For getting feature reminder!", "error")
                }
            } else {
                swal("Failed", "The browser does not support notification feature!", "error")
            }
        }
    })


    // Meminta ijin menggunakan Notification API
    function requestPermission() {
        return new Promise((resolve, reject) => {
            Notification.requestPermission().then(function (result) {
                if (result === "denied") {
                    reject(result);
                } else if (result === "default") {
                    reject(result);
                }
                resolve(result);
            });

        })
    }

    const createScheduledNotification = async (tag, title, timestamp) => {
        const registration = await navigator.serviceWorker.getRegistration();
        registration.showNotification(title, {
            tag: tag,
            renotify: true,
            body: 'The match will be starting',
            icon: '/src/img/ball_bg.png',
            badge: '/src/img/ball.png',
            showTrigger: new TimestampTrigger(timestamp)
        });
    };

    function fetchMatchesByStatus(status) {
        $('.preloader-background').fadeIn();
        $('.preloader-wrapper').fadeIn();
        DataSource.getMatchesByStatus(status)
            .then(renderResult)
            .catch(renderError)
    }

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    function renderError(error) {
        const tableMatchesElement = document.createElement('table-matches');
        const containerElement = document.querySelector('#entry');
        console.log(error);
        tableMatchesElement.error = error;
        containerElement.appendChild(tableMatchesElement);

        $('.preloader-background').fadeOut('fast');
        $('.preloader-wrapper').fadeOut('fast');
    }

    function fetchTeamById(id) {
        return DataSource.getTeamById(id)
            .then(response => response.crestUrl)
            .catch(error => 'null')
    }

    async function renderResult(result) {
        const tableMatchesElement = document.createElement('table-matches');
        const containerElement = document.querySelector('#entry');
        let results = await addCrestUrl(result);

        tableMatchesElement.matches = results;
        containerElement.appendChild(tableMatchesElement);
        const btnReminders = document.querySelectorAll('.btn-reminder.matches');
        let resultReminders = [];

        await reminders().then(data => {
            resultReminders = data;
        });
        let btnIds = [];
        [...btnReminders].forEach((e, i) => {
            btnIds.push(parseInt(e.getAttribute('data-id')))
        });
        let reminderIds = [];
        resultReminders.forEach(e => {
            reminderIds.push(e.id);
        });
        let intersection = btnIds.filter(x => reminderIds.includes(x));
        // disbaled button
        intersection.forEach(e => {
            const el = document.querySelector(`[data-id="${e}"]`);
            el.classList.add('disabled');
            el.innerHTML = 'Reminded';
        });

        $('.preloader-background').fadeOut('fast');
        $('.preloader-wrapper').fadeOut('fast');
    }

    function reminders() {
        return new Promise((resolve, reject) => {
            db.getAll().then(data => resolve(data))
        })
    }

    async function addCrestUrl(result) {
        await asyncForEach(result.matches, async match => {
            if ('caches' in window) {
                // away
                await caches.match(`${BASE_URL}teams/${match.awayTeam.id}`)
                    .then(async response => {
                        if (response) {
                            await response.json().then(result => {
                                match.awayTeam['crestUrl'] = result.crestUrl;
                            })

                        } else {
                            match.awayTeam['crestUrl'] = await fetchTeamById(match.awayTeam.id)
                        }
                    })

                //home
                await caches.match(`${BASE_URL}teams/${match.homeTeam.id}`)
                    .then(async response => {
                        if (response) {
                            await response.json().then(result => {
                                match.homeTeam['crestUrl'] = result.crestUrl;
                            })

                        } else {
                            match.homeTeam['crestUrl'] = await fetchTeamById(match.homeTeam.id)
                        }
                    })
            } else {
                match.awayTeam['crestUrl'] = await fetchTeamById(match.awayTeam.id)
                match.homeTeam['crestUrl'] = await fetchTeamById(match.homeTeam.id)
            }
        });
        return result;
    }
}

export default matches;