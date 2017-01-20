let $ = window.jQuery

export function showMessage (element, data, isArray = true) {
  let options = ''
  if (isArray) {
    for (let k in data) {
      if (data.hasOwnProperty(k)) {
        data[k].forEach((error) => {
          options += `<p>${error}</p>`
        })
      }
    }
  } else {
    options = data
  }
  $(element).html('').append(options)
  showElement($(element))
}

export function showElement (element, time = 0) {
  $(element).show(time)
}

export function hideElement (element, time = 0) {
  $(element).hide(time)
}

export function resetForm (form, ignore) {
  let element = form[0].elements
  if (element.length > 0) {
    for (var i = 0; i < element.length; i++) {
      if (!inArray(element[i].name, ignore)) {
        element[i].value = ''
        if (element[i].getAttribute('type') === 'checkbox') {
          element[i].checked = false
        }
        if (element[i].tagName === 'SELECT') {
          $(element[i]).trigger('change')
        }
      }
    }
  }
}

export function changeStatusButton (element, status = true) {
  if (status) {
    $(element).attr('disabled', 'true')
  } else {
    $(element).removeAttr('disabled')
  }
}

export function inArray (needle, haystack, argStrict) {
  //  discuss at: http://locutus.io/php/in_array/
  let key = ''
  let strict = !!argStrict
  if (strict) {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true
      }
    }
  } else {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true
      }
    }
  }
  return false
}
export function objectLength (obj) {
  return Object.keys(obj).length
}

export function generateMessageLog (error) {
  if (objectLength(error) < 1) {
    return {}
  }
  let responseText = error && error.responseText || null
  let codeStatus = error && error.status
  let status = error && error.statusText
  let data = {
    responseText: responseText,
    codeStatus: codeStatus,
    status: status
  }
  return data
}

export function setValue (form, value = 'POST', element = '_method', type = 'input', object = []) {
  if (type === 'input') {
    if (form && typeof (form) !== undefined) {
      form.find(`input[name="${element}"]`).val(value)
      return
    }
    $(element).val(value)
  } else if (type === 'select') {
    $(element).val(value).trigger('change', object)
  }
}

if (!Object.keys) {
  Object.keys = (function () {
    'use strict'
    let hasOwnProperty = Object.prototype.hasOwnProperty
    let hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString')
    let dontEnums = [
      'toString',
      'toLocaleString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'constructor'
    ]
    let dontEnumsLength = dontEnums.length
    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object')
      }

      let result = []
      let prop
      let i

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop)
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i])
          }
        }
      }
      return result
    }
  }())
}
