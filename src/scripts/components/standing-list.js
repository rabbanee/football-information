class StandingList extends HTMLElement {
    set standings(standings) {
        this._standings = standings;
        this.render();
    }

    set error(error) {
        this._error = error;
        this.renderError();

    }

    render() {
        this.innerHTML = ``;
        const standingItemElement = document.createElement('standing-item');
        standingItemElement.standing = this._standings;
        console.log(this);
        this.appendChild(standingItemElement);
    }

    renderError() {
        this.innerHTML = `<h4>Error. Please Check your connection</h4>`;
    }

}
customElements.define('standing-list', StandingList);