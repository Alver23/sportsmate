/*
Module Dependencies
 */

import { showMessage, showElement, hideElement, resetForm, changeStatusButton, generateMessageLog, setValue } from '../util/'
import { saveLog } from '../api/'

let $ = window.jQuery
let path = window.location.href

$(function () {
  var tDatatable = $('#organization_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: `${path}/getpager`,
    columns: [
      { data: 'name', name: 'organization.name' },
      { data: 'email', name: 'organization.email' },
      { data: 'phone', name: 'organization.phone' },
      { data: 'description', name: 'organization.description' },
      { data: 'owner', name: 'owner' },
      { data: 'updater', name: 'updater' },
      { data: 'created_at', name: 'organization.created_at' },
      { data: 'updated_at', name: 'organization.updated_at' },
      {data: 'action', name: 'action', orderable: false, searchable: false}
    ]
  })
  let formOrganization = $('#formOrganization')
  let divSuccess = $('#form-message-success')
  let divError = $('#form-message-error')
  formOrganization.validate({
    rules: {
      name: {required: true}
    },
    highlight: function (element) { // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error') // set error class to the control group
    },
    unhighlight: function (element) { // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error') // set error class to the control group
    },
    submitHandler: function (form) {
      let method = formOrganization.find('input[name="_method"]').val()
      let url = path
      if (method === 'PUT') {
        let organizationId = formOrganization.find('input[name="organization_id"]').val()
        url = `${path}/${organizationId}`
      }
      console.log(url)
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
          resetForm(formOrganization, ['_token', '_method'])
          showMessage(divSuccess, obj.message ? obj.message : '', false)
          setTimeout(() => {
            hideElement(divSuccess, 3000)
            $('[data-widget=collapse2]').trigger('click')
            tDatatable.fnClearTable(true)
          }, 1000)
          setValue(formOrganization)
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
            module: `Organizations (Function ${method})`,
            description: JSON.stringify(description)
          }
          saveLog(divError, data)
        }
      })
    }
  })

  $(document).on('click', '.organizationDelete', function (ev) {
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

  $(document).on('click', '.organizationEdit', function (ev) {
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
      setValue(formOrganization, 'PUT')
      setValue(formOrganization, data.id, 'organization_id')
      $.each(obj.data, function (i, val) {
        $(`#formOrganization *[name=${i}]`).val(val)
      })
      let box = $('#boxForm')
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset'])
      }
    })
    .fail(function (obj) {
      let description = generateMessageLog(obj)
      let data = {
        type_log_id: 1,
        module: 'Organizations (Function Edit)',
        description: JSON.stringify(description)
      }
      saveLog(divError, data)
    })
  })
})
