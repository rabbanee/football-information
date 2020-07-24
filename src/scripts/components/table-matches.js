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
                let awayUrl = match.awayTeam.crestUrl;
                let homeUrl = match.homeTeam.crestUrl;
                html += `
                    <div class="match">
                        <div class="info">
                            <p class="grey-text">${match.competition.name}. ${time(match.utcDate)}</p>
                        </div>
                        <div class="awayTeam">
                            <img src="${awayUrl === null || awayUrl === 'null' ? '/src/img/default.png' : awayUrl.replace(/^http:\/\//i, 'https://')}" class="crestUrl" onerror="if (this.src !== '/src/img/default.png') this.src = '/src/img/default.png'" alt="${match.awayTeam.name}">
                            <p>${match.awayTeam.name}</p>
                        </div>
                        <div class="wrapper-btn-vs">
                            <p class="vs grey-text">VS</p> 
                            <button class="btn-reminder ${button ? 'reminders' : 'matches'}" data-id="${match.id}">${button ? button : 'Remind to Watch'}</button>
                        </div>
                        <div class="homeTeam">
                            <img src="${homeUrl === null || homeUrl === 'null' ? '/src/img/default.png' : homeUrl.replace(/^http:\/\//i, 'https://')}" class="crestUrl" onerror="if (this.src !== '/src/img/default.png') this.src = '/src/img/default.png'" alt="${match.homeTeam.name}">
                            <p>${match.homeTeam.name}</p>
                        </div>
                    </div>
                `;
            });
            return html;
        }

        if (this._matches.matches.length <= 0) {
            this.innerHTML = `
                <div class="matches-wrapper-empty">
                    <img src="/src/img/empty.png" alt="empty" class="img-empty">
                    <p class="text-empty">Data is empty</p>
                </div>
            `;

        } else {
            this.innerHTML = `
                <div class="matches-wrapper">
                    ${rowTable(this._matches.matches, this._button)}
                </div>
            `;
        }
    }


    renderError() {
        this.innerHTML = `<h4>Error. Please check your connection</h4>`;
    }

}
customElements.define('table-matches', TableMatches);