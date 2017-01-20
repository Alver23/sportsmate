/**
 * Module Dependencies
 */

import { showMessage, showElement, hideElement, resetForm, setValue, generateMessageLog, changeStatusButton } from '../util/'
import { saveLog } from '../api/'

let $ = window.jQuery
let path = window.location.href

$(function () {
  let formLeague = $('#formLeague')
  let divSuccess = $('#form-message-success')
  let divError = $('#form-message-error')

  let tDatatable = $('#league_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: `${path}/datatable`,
    columns: [
      { data: 'name', name: 'name' },
      { data: 'country_name', name: 'country_name' },
      { data: 'sport_name', name: 'sport_name' },
      { data: 'points', name: 'points' },
      { data: 'owner', name: 'owner' },
      { data: 'updater', name: 'created_at' },
      { data: 'created_at', name: 'created_at' },
      { data: 'updated_at', name: 'updated_at' },
      {data: 'action', name: 'action', orderable: false, searchable: false}
    ]
  })
  formLeague.validate({
    rules: {
      name: {required: true},
      sport_id: {required: true}
    },
    highlight: function (element) { // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error') // set error class to the control group
    },
    unhighlight: function (element) { // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error') // set error class to the control group
    },
    submitHandler: function (form) {
      let method = formLeague.find('input[name="_method"]').val()
      let url = path
      if (method === 'PUT') {
        let leagueId = formLeague.find('input[name="league_id"]').val()
        url = `${path}/${leagueId}`
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
          resetForm(formLeague, ['_token', '_method'])
          showMessage(divSuccess, obj.message ? obj.message : '', false)
          setTimeout(() => {
            hideElement(divSuccess, 3000)
            $('[data-widget=collapse2]').trigger('click')
            tDatatable.fnClearTable(true)
          }, 1000)
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

  $(document).on('click', '.leagueEdit', function (ev) {
    let id = $(this).data('id')
    if (!id) {
      return false
    }
    let button = $(this)
    showElement($('.modalLoading'))
    changeStatusButton(button)
    $.ajax({
      url: `${path}/${id}/edit`,
      type: 'GET',
      dataType: 'json'
    })
    .done(function (obj) {
      let data = obj.data
      changeStatusButton(button, false)
      hideElement($('.modalLoading'), 2000)
      setValue(formLeague, 'PUT')
      setValue(formLeague, data.id, 'league_id')
      $.each(obj.data, function (i, val) {
        $(`#formLeague *[name=${i}]`).val(val)
      })
      setValue('', data.sport_id, $('#league_sport_id'), 'select')
      setValue('', data.country_id, $('#league_country_id'), 'select')
      $.each(obj.data, function (i, val) {
        $(`#formLeague *[name=${i}]`).val(val)
      })
      let box = $('#boxFormLeague')
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset'])
      }
    })
    .fail(function (obj) {
      let description = generateMessageLog(obj)
      let data = {
        type_log_id: 1,
        module: 'League (Function Edit)',
        description: JSON.stringify(description)
      }
      saveLog(divError, data)
    })
  })
})
