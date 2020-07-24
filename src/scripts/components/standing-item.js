class StandingItem extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    set standing(standing) {
        this._standing = standing;
        this.render();
    }

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
                                <th class="center">No</th>
                                <th>Team</th>
                                <th class="center">MP</th>
                                <th class="center">W</th>
                                <th class="center">PT</th>
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
                                    <th class="center">No</th>
                                    <th>Team</th>
                                    <th class="center">D</th>
                                    <th class="center">W</th>
                                    <th class="center">PT</th>
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
                let url = row.team.crestUrl;
                html += ` 
                    <tr>
                        <td class="center">${row.position}</td>
                        <td class="team">
                            <img src="${url === null || url === 'null' ? '/src/img/default.png' : url.replace(/^http:\/\//i, 'https://')}" onerror="if (this.src !== '/src/img/default.png') this.src = '/src/img/default.png'" alt="Img team" class="img-crest">
                            ${row.team.name}
                        </td>
                        <td class="center">${row.draw}</td>
                        <td class="center">${row.won}</td>
                        <td class="center">${row.points}</td>
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
                    margin-right: 8px;
                }
                td.team {
                    display: flex;
                    align-items: center;
                }
                .tabs-content.carousel .carousel-item{
                    height: auto !important;
                }
            </style>
            
            <h4>${this._standing.competition.area.name}</h4>    
            ${standingTable(this._standing)}
        `;

    }



}
customElements.define('standing-item', StandingItem);