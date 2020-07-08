const $ = require('jquery')
const { compile } = require('handlebars');
const template = require('../../html/matches.handlebars');
const DataSource = require('../data/data-source.js').default;

function matches() {
    $('#app').html(compile(template)())

    DataSource.getMatchesByStatus('SCHEDULED')
        .then(result => console.log(result))
        .catch(error => console.log(error))
    console.log('mathes');
}

export default matches;