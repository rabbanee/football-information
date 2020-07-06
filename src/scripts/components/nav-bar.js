class NavBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <style>
                .brand-logo{
                    font-size: 24px !important;
                }
            </style>
            <nav role="navigation">
                <div class="nav-wrapper container">
                    <a href="" class="brand-logo" id="logo-container">Footbal Information</a>
                    <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <ul class="topnav right hide-on-med-and-down">
                        <li><a href="/home">Home</a></li>
                        <li><a href="/team">Team</a></li>
                        <li><a href="collapsible.html">Favorite</a></li>
                    </ul>
                    <ul id="nav-mobile" class="sidenav">
                        <li><a href="#">Home</a></li>
                        <li><a href="">Team</a></li>
                        <li><a href="collapsible.html">Favorite</a></li>
                    </ul>
                </div>
            </nav>
        `;
    }
}
customElements.define('nav-bar', NavBar);