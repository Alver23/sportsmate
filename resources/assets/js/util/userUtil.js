/**
 * Module Dependencies
 */

import ucwords from 'locutus/php/strings/ucwords'

let $ = window.jQuery

export function removeDivPassword (element) {
  $(element).find('div').remove()
  $(element).find('label').remove()
}

export function createDivPassword (element = 'password') {
  let type = (element === 'password' ? element : 'confirm_password')
  let label = ucwords(type.replace('_', ' '))
  let Html = `<label for="${type}"><strong class="text-red">*</strong>${label}:</label>
            <div class="password">
                <input type="password" name="${type}" id="${type}" class="form-control" required="true" maxlength="50" minlength="6">   
                <span class="glyphicon glyphicon-eye-open open_${type}"></span>
            </div>`
  return Html
}

