const moment = require('moment');
class TableMatches extends HTMLElement {
    set matches(matches) {
        this._matches = matches;
        this.render();
    }

    set button(button) {
        this._button = button;
        this.render();
    }

    set error(error) {
        this._error = error;
        this.renderError();

    }

    render() {
        function time(date) {
            const current = moment().startOf('day');
            const localDate = moment.utc(date).local().format();
            const localTime = moment.utc(date).local().format('HH:mm');

            const start = moment(localDate, "YYYY-MM-DD");
            const diff = moment.duration(start.diff(current)).asDays();

            if (diff === 0) {
                return `Today, on ${localTime}`;
            }
            else if (diff === 1) {
                return `Tomorrow, on ${localTime}`;
            }
            else if (diff === - 1) {
                return `Yesterday, on ${localTime}`;
            }
        }
        function rowTable(matches, button) {
            let html = '';
            matches.forEach(match => {
                html += `
                    <div class="match">
                        <div class="info">
                            <p class="grey-text">${match.competition.name}. ${time(match.utcDate)}</p>
                        </div>
                        <div class="awayTeam">
                            <img src="${match.awayTeam.crestUrl}" class="crestUrl" onerror="if (this.src !== '/src/img/default.png') this.src = '/src/img/default.png'" alt="${match.awayTeam.name}">
                            <p>${match.awayTeam.name}</p>
                        </div>
                        <div class="wrapper-btn-vs">
                            <p class="vs grey-text">VS</p> 
                            <button class="btn-reminder ${button ? 'reminders' : 'matches'}" data-id="${match.id}">${button ? button : 'Remind to Watch'}</button>
                        </div>
                        <div class="homeTeam">
                            <img src="${match.homeTeam.crestUrl}" class="crestUrl" onerror="if (this.src !== '/src/img/default.png') this.src = '/src/img/default.png'" alt="${match.homeTeam.name}">
                            <p>${match.homeTeam.name}</p>
                        </div>
                    </div>
                `;
            });
            return html;
        }


        this.innerHTML = `
            <div class="matches-wrapper">
                ${rowTable(this._matches.matches, this._button)}
            </div>
        `;
    }


    renderError() {
        this.innerHTML = `<h4>Error. Please check your connection</h4>`;
    }

}
customElements.define('table-matches', TableMatches);