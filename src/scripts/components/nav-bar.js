class NavBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <nav role="navigation">
                <div class="nav-wrapper container">
                    <a href="/" class="brand-logo" id="logo-container" data-path="">Footbal Information</a>
                    <a href="#" data-target="nav-mobile" class="sidenav-trigger">☰</a>
                    <ul class="topnav right hide-on-med-and-down">
                        <li><a href="/" data-path="">Home</a></li>
                        <li><a href="/matches" data-path="">Matches</a></li>
                        <li><a href="/reminders" data-path="">Reminders</a></li>
                    </ul>
                    <ul id="nav-mobile" class="sidenav">
                        <li><a href="/" data-path="">Home</a></li>
                        <li><a href="/matches" data-path="">Matches</a></li>
                        <li><a href="/reminders" data-path="">Reminders</a></li>
                    </ul>
                </div>
            </nav>
        `;
    }
}
customElements.define('nav-bar', NavBar);