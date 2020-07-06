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

}

export default DataSource;