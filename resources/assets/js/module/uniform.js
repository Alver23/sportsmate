/*
Module Dependencies
 */

import { showMessage, showElement, hideElement, resetForm, changeStatusButton, generateMessageLog, setValue } from '../util/'
import { saveLog } from '../api/'

let $ = window.jQuery
let path = window.location.href

$(function () {
  var tDatatable = $('#uniform_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: `${path}/getpager`,
    columns: [
      { data: 'name', name: 'name' },
      { data: 'description', name: 'description' },
      { data: 'owner', name: 'owner' },
      { data: 'updater', name: 'updater' },
      { data: 'created_at', name: 'created_at' },
      { data: 'updated_at', name: 'updated_at' },
      {data: 'action', name: 'action', orderable: false, searchable: false}
    ]
  })
  let formUniform = $('#formUniform')
  let divSuccess = $('#form-message-success')
  let divError = $('#form-message-error')
  formUniform.validate({
    rules: {
      name: {required: true},
      jersey_color_id: {required: true},
      socks_color_id: {required: true},
      short_color_id: {required: true}
    },
    highlight: function (element) { // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error') // set error class to the control group
    },
    unhighlight: function (element) { // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error') // set error class to the control group
    },
    submitHandler: function (form) {
      let method = formUniform.find('input[name="_method"]').val()
      let url = path
      if (method === 'PUT') {
        let uniformId = formUniform.find('input[name="uniform_id"]').val()
        url = `${path}/${uniformId}`
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
          resetForm(formUniform, ['_token', '_method'])
          showMessage(divSuccess, obj.message ? obj.message : '', false)
          setValue('', '', $('#short_color_id'), 'select')
          setValue('', '', $('#jersey_color_id'), 'select')
          setValue('', '', $('#socks_color_id'), 'select')
          setTimeout(() => {
            hideElement(divSuccess, 3000)
            $('[data-widget=collapse2]').trigger('click')
            tDatatable.fnClearTable(true)
          }, 1000)
          setValue(formUniform)
        },
        error: function (context, xhr, status, errMsg) {
          hideElement($('.modalLoading'), 800)
          if (context.status === 422) {
            let errors = context && context.responseText || {}
            errors = JSON.parse(errors)
            showMessage(divError, errors)
          }
        }
      })
    }
  })

  $(document).on('click', '.uniformDelete', function (ev) {
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
        module: 'Groups (Function Delete)',
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

  $(document).on('click', '.uniformEdit', function (ev) {
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
      setValue(formUniform, 'PUT')
      setValue(formUniform, data.id, 'uniform_id')
      $.each(obj.data, function (i, val) {
        $(`#formUniform *[name=${i}]`).val(val)
      })
      setValue('', data.short_color_id, $('#short_color_id'), 'select')
      setValue('', data.jersey_color_id, $('#jersey_color_id'), 'select')
      setValue('', data.socks_color_id, $('#socks_color_id'), 'select')
      let box = $('#boxForm')
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset'])
      }
    })
    .fail(function (obj) {
      console.log('error', obj)
    })
  })
})
