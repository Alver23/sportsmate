import { objectLength, showMessage } from '../util/'

let $ = window.jQuery
let hotsName = window.location.origin

export function saveLog (element, data) {
  if (objectLength(data) < 1) {
    return false
  }
  $.ajax({
    url: `${hotsName}/logs`,
    type: 'post',
    dataType: 'json',
    data: data
  })
  .done(function (obj) {
    showMessage(element, obj.message ? obj.message : '', false)
  })
}

export function getCountry (fn) {
  $.get('countries', (data) => {
    fn(data)
  })
}

export function getStateByCountry (countryId, fn) {
  $.get(`country/${countryId}/states`, (data) => {
    fn(data)
  })
}

export function getCityByState (stateId, fn) {
  $.get(`state/${stateId}/cities`, (data) => {
    fn(data)
  })
}
