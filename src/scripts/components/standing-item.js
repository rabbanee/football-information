class StandingItem extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    set standing(standing) {
        this._standing = standing;
        this.render();
    }

    // set id(id){
    // }

    render() {

        function standingTable(standing) {
            let html = '';
            if (standing.competition.id === 2001) {
                let unique = [];

                standing = standing.standings;
                standing.forEach(s => {
                    if (s.type !== 'TOTAL') {
                        return;
                    }

                    unique.push(s.group);

                    html += `
                    <h5>${s.group.replace(/_/g, ' ')}</h5>
                    <table class="standing-table responsive-table mb-3">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Team</th>
                                <th>MP</th>
                                <th>W</th>
                                <th>PT</th>
                            </tr>
                        </thead>
                                        
                        <tbody>
                            ${rowTable(s.table)}
                        </tbody>
                    </table>`;
                });

            } else {
                standing = standing.standings;
                standing.forEach(s => {
                    if (s.type !== 'TOTAL') {
                        return;
                    }
                    html += `
                        <table class="standing-table responsive-table">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Team</th>
                                <th>D</th>
                                <th>W</th>
                                <th>PT</th>
                            </tr>
                            </thead>
    
                            <tbody>
                                ${rowTable(s.table)}
                            </tbody>
                        </table>`;
                });

            }
            return html;

        }

        function rowTable(rows) {
            let html = '';
            rows.forEach((row) => {
                html += ` 
                    <tr>
                        <td>${row.position}</td>
                        <td>
                            <img src="${row.team.crestUrl}" alt="Img team" class="img-crest">
                            ${row.team.name}
                        </td>
                        <td>${row.draw}</td>
                        <td>${row.won}</td>
                        <td>${row.points}</td>
                    </tr>
                `;
            });
            return html;
        }

        this.setAttribute('id', this._standing.competition.id);

        this.innerHTML = `
            <style>
                .standing-wrapper{
                    width: 90%;
                    margin: auto;
                    height: 100% !important;
                }
                .tabs-content.carousel .carousel-item {
                    height: auto !important;
                }
                .mb-3{
                    margin-bottom: 30px;
                }
                .img-crest{
                    width: 40px;
                    height: 40px;
                }
                
                .tabs-content.carousel .carousel-item{
                    height: auto !important;
                }
            </style>
            <div  class="col s12 standing-content grey lighten-4">
                <div class="standing-wrapper">
                    <h4>${this._standing.competition.area.name}</h4>    
                    ${standingTable(this._standing)}
                </div>
            </div>
        `;

    }

}
customElements.define('standing-item', StandingItem);