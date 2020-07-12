class DataSource {
    static getStandingsById(id) {
        return fetch(`https://api.football-data.org/v2/competitions/${id}/standings`, {
            headers: {
                'X-Auth-Token': '3970944df3c546c4800ebd7a6f2da817'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.competition) {
                    return Promise.resolve(responseJson)
                } else {
                    return Promise.reject(`${id} is not found`);
                }
            })
    }

    static getMatchesByStatus(status) {
        return fetch(`https://api.football-data.org/v2/matches?status=${status}`, {
            headers: {
                'X-Auth-Token': '3970944df3c546c4800ebd7a6f2da817'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.matches) {
                    return Promise.resolve(responseJson)
                } else {
                    return Promise.reject(`data is not found`);
                }
            })
    }

    static getMatchByIdAndStatus(id, status = 'SCHEDULED') {
        return new Promise((resolve, reject) => {
            id = parseInt(id);
            if ('caches' in window) {
                caches.match(`https://api.football-data.org/v2/matches?status=${status}`).then(response => {
                    if (response) {
                        response.json().then(data => {
                            let matches = data.matches;

                            matches.forEach(match => {
                                if (match.id === id) {
                                    resolve(match);
                                }
                            });
                        })
                    }
                })
            } else {
                fetch(`https://api.football-data.org/v2/matches/${id}`, {
                    headers: {
                        'X-Auth-Token': '3970944df3c546c4800ebd7a6f2da817'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        resolve(data.match)
                    })
                    .catch(err => reject(err))
            }
        })
    }

    static getTeamById(id) {
        return fetch(`https://api.football-data.org/v2/teams/${id}`, {
            headers: {
                'X-Auth-Token': '3970944df3c546c4800ebd7a6f2da817'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson)
                } else {
                    return Promise.reject(`data is not found`);
                }
            })
    }

}

export default DataSource;