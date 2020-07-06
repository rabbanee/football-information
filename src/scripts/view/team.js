import $ from 'jquery'
import { compile } from 'handlebars'
import template from '../../html/team.handlebars'

function team() {
    let user = 'Jonh'
    $('#app').html(compile(template)({
        user,
    }))

}

export default team;