const template = require('../../html/test.handlebars');
const $ = require('jquery');
import { compile } from 'handlebars'
export default () => {
    let user = 'TEst';
    $('#app').html(compile(template)({
        user
    }))
}