/*
Module Dependencies
 */
import 'jquery-password-generator-plugin/dist/jquery.jquery-password-generator-plugin'

import { showMessage, showElement, hideElement, resetForm, changeStatusButton, generateMessageLog, setValue } from '../util/'
import { saveLog, getCountry, getStateByCountry, getCityByState } from '../api/'
import { removeDivPassword } from '../util/userUtil'

let $ = window.jQuery
let path = window.location.href

$(function () {
  var tDatatable = $('#user_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: `${path}/getpager`,
    columns: [
      { data: 'name', name: 'name' },
      { data: 'email', name: 'email' },
      { data: 'type_member_name', name: 'type_member_name' },
      { data: 'phone', name: 'phone' },
      { data: 'activated', name: 'activated' },
      { data: 'status', name: 'status' },
      { data: 'owner', name: 'owner' },
      { data: 'updater', name: 'updater' },
      { data: 'created_at', name: 'created_at' },
      { data: 'updated_at', name: 'updated_at' },
      {data: 'action', name: 'action', orderable: false, searchable: false}
    ]
  })
  let formUser = $('#formUser')
  let divSuccess = $('#form-message-success')
  let divError = $('#form-message-error')
  let copyPassword = $('.copyPassword')
  let selectCountry = $('#country_id')
  let selectState = $('#state_id')
  let selectCity = $('#city_id')
  formUser.validate({
    ignore: ['.ignore'],
    rules: {
      first_name: {required: true},
      last_name: {required: true},
      email: {required: true, email: true},
      password: {required: true, pwdsegurity: true},
      confirm_password: {required: true, equalTo: '#password'},
      type_member: {required: true}
    },
    highlight: function (element) { // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error') // set error class to the control group
    },
    unhighlight: function (element) { // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error') // set error class to the control group
    },
    submitHandler: function (form) {
      let method = formUser.find('input[name="_method"]').val()
      let url = path
      if (method === 'PUT') {
        let userId = formUser.find('input[name="user_id"]').val()
        url = `${path}/${userId}`
      }
      $(form).ajaxSubmit({
        url: `${url}`,
        type: 'post',
        dataType: 'json',
        beforeSubmit: function (arr, $form, options) {
          showElement($('.modalLoading'))
        },
        success: function (obj, statusText, xhr, $form) {
          hideElement(divError, 500)
          hideElement($('.modalLoading'), 2000)
          hideElement(copyPassword, 1000)
          resetForm(formUser, ['_token', '_method'])
          showMessage(divSuccess, obj.message ? obj.message : '', false)
          setTimeout(() => {
            hideElement(divSuccess, 3000)
            $('[data-widget=collapse2]').trigger('click')
            tDatatable.fnClearTable(true)
          }, 1000)
          setValue(formUser)
          showElement($('#generatePassword'), 1000)
        },
        error: function (context, xhr, status, errMsg) {
          hideElement($('.modalLoading'), 800)
          if (context.status === 422) {
            let errors = context && context.responseText || {}
            errors = JSON.parse(errors)
            showMessage(divError, errors)
            return
          }
          let description = generateMessageLog(context)
          let data = {
            type_log_id: 1,
            module: `users (Function ${method})`,
            description: JSON.stringify(description)
          }
          saveLog(divError, data)
        }
      })
    }
  })

  $(document).on('click', '.userDelete', function (ev) {
    ev.preventDefault()
    let button = $(this)
    let form = $(this).parent()
    let method = form.find('input[name="_method"]').val()
    let token = form.find('input[name="_token"]').val()
    let url = form.attr('action')
    let data = {
      _method: method,
      _token: token
    }
    showElement($('.modalLoading'))
    changeStatusButton($(this))
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data
    })
    .done(function (obj) {
      changeStatusButton(button, false)
      hideElement($('.modalLoading'), 2000)
      showMessage(divSuccess, obj.message ? obj.message : '', false)
      setTimeout(() => {
        hideElement(divSuccess, 3000)
        tDatatable.fnClearTable(true)
      }, 1000)
    })
    .fail(function (error) {
      let description = generateMessageLog(error)
      let data = {
        type_log_id: 1,
        module: 'Users (Function Delete)',
        description: JSON.stringify(description)
      }
      saveLog(divError, data)
      hideElement($('.modalLoading'), 2000)
      changeStatusButton(button, false)
      setTimeout(() => {
        hideElement(divError, 3000)
      }, 1000)
    })
  })

  $(document).on('click', '.userEdit', function (ev) {
    let id = $(this).data('id')
    if (!id) {
      return false
    }
    $.ajax({
      url: `${path}/${id}/edit`,
      type: 'GET',
      dataType: 'json'
    })
    .done(function (obj) {
      let data = obj.data
      setValue(formUser, 'PUT')
      setValue(formUser, data.id, 'user_id')
      $.each(obj.data, function (i, val) {
        $(`#formUser *[name=${i}]`).val(val)
      })
      setValue('', data.type_member_id, $('#type_member_id'), 'select')
      if (data.category_id && typeof (data.category_id) !== undefined) {
        setValue('', data.category_id, $('#category_id'), 'select')
      }
      if (data.position_id && typeof (data.position_id) !== undefined) {
        setValue('', data.position_id, $('#position_id'), 'select')
      }
      if (data.country_id) {
        setValue('', data.country_id, $('#country_id'), 'select', {stateId: data.state_id, cityId: data.city_id})
      }
      let box = $('#boxForm')
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset'])
      }
      removeDivPassword($('.div_password'))
      removeDivPassword($('.div_confirm_password'))
      hideElement($('#generatePassword'), 1000)
    })
    .fail(function (obj) {
      let description = generateMessageLog(obj)
      let data = {
        type_log_id: 1,
        module: 'users (Function Edit)',
        description: JSON.stringify(description)
      }
      saveLog(divError, data)
    })
  })

  $(document).on('keydown', '#password', function () {
    if ($(this).val()) {
      showElement($('.open_password'), 1000)
    } else {
      hideElement($('.open_password', 1000))
    }
  })
  $('#confirm_password').on('keydown', function () {
    if ($(this).val()) {
      showElement($('.open_confirm'), 1000)
    } else {
      hideElement($('.open_confirm', 1000))
    }
  })
  $(document).on('mousedown', '.open_password', function () {
    $('#password').attr('type', 'text')
  }).mouseup(function () {
    $('#password').attr('type', 'password')
  }).mouseout(function () {
    $('#password').attr('type', 'password')
  })
  $(document).on('mousedown', '.open_confirm', function () {
    $('#confirm_password').attr('type', 'text')
  }).mouseup(function () {
    $('#confirm_password').attr('type', 'password')
  }).mouseout(function () {
    $('#confirm_password').attr('type', 'password')
  })

  $(document).on('click', '#generatePassword', function (ev) {
    let randomPassword = $.passGen({'length': 30, 'numeric': true, 'lowercase': true, 'uppercase': true, 'special': true})
    $('#password, #confirm_password').val(randomPassword)
    copyPassword.html(`<strong>Password:</strong> ${randomPassword}`).show()
    console.log(randomPassword)
  })

  getCountry((obj) => {
    let countries = obj && obj.data || {}
    let options = ''
    $.each(countries, (index, val) => {
      options += `<option value=${val.id}>${val.name}</option>`
    })
    selectCountry.append(options)
  })

  $(document).on('change', '#country_id', function (ev, params) {
    let countryId = $(this).val()
    selectState.empty().append('<option value="">[Select Option]</option>').trigger('change')
    if (countryId && typeof ($countryId) !== undefined) {
      let stateId = params && params.stateId || null
      let cityId = params && params.cityId || null
      getStateByCountry(countryId, (res) => {
        let states = res && res.data || {}
        let options = ''
        $.each(states, (index, val) => {
          let selected = ''
          if (stateId && typeof (stateId) !== undefined) {
            if (val.id === stateId) {
              selected = 'selected="true"'
            }
          }
          options += `<option value=${val.id} ${selected}>${val.name}</option>`
        })
        let obj = {}
        if (cityId && typeof (cityId) !== undefined) {
          obj = {cityId: cityId}
        }
        selectState.append(options).trigger('change', obj)
      })
    }
  })

  $(document).on('change', '#state_id', function (ev, params) {
    let stateId = $(this).val()
    selectCity.empty().append('<option value="">[Select Option]</option>').trigger('change')
    if (stateId && typeof (stateId) !== undefined) {
      let cityId = params && params.cityId || null
      getCityByState(stateId, function (res) {
        let cities = res && res.data || {}
        let options = ''
        $.each(cities, (index, val) => {
          let selected = ''
          if (cityId && typeof (cityId) !== undefined) {
            if (val.id === cityId) {
              selected = 'selected="true"'
            }
            selected = 'selected="true"'
          }
          options += `<option value=${val.id} ${selected}>${val.name}</option>`
        })
        selectCity.append(options).trigger('change')
      })
    }
  })

  $(document).on('change', '#type_member_id', function () {
    let id = parseInt($(this).val())
    let divPlayer = $('#typeMemberPlayer')
    if (id && typeof (id) !== undefined) {
      if (id === 6) {
        divPlayer.show()
      } else {
        divPlayer.hide()
        setValue('', '', $('#category_id'), 'select')
        setValue('', '', $('#position_id'), 'select')
        setValue('', '', $('#jersey_number'))
      }
    } else {
      divPlayer.hide()
      setValue('', '', $('#category_id'), 'select')
      setValue('', '', $('#position_id'), 'select')
      setValue('', '', $('#jersey_number'))
    }
  })
})
