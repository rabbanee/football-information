const Standings = require('../data/standings.js').default;
class StandingList extends HTMLElement {
    connectedCallback() {
        this.render();
    }


    render() {
        function liStandings() {
            let li = '';
            Standings.forEach(standing => {
                li += `<li class="tab col s3"><a class="active" href="#${standing.id}">${standing.name}</a></li>`;
            });
            return li;
        }

        this.innerHTML = `
            <style>
                .tabs{
                    margin-top: 10px;
                }
            </style>
            <h4>Standing</h4>
            <ul id="tabs-swipe-demo" class="tabs">
               ${liStandings(this._listStandings)}
            </ul>
        `;
    }


}
customElements.define('standing-list', StandingList);