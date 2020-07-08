const Standings = require('../data/standings.js').default;
class StandingList extends HTMLElement {
    set standings(standings) {
        this._standings = standings;
        this.render();
    }

    render() {
        this.innerHTML = ``;
        const standingItemElement = document.createElement('standing-item');
        standingItemElement.standing = this._standings;
        this.appendChild(standingItemElement);
    }


}
customElements.define('standing-list', StandingList);