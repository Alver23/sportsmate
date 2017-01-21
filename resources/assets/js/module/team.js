/**
 * Module Dependencies
 */

import { showMessage, showElement, hideElement, resetForm, setValue, generateMessageLog, changeStatusButton } from '../util/'
import { saveLog } from '../api/'

let $ = window.jQuery
let path = window.location.href

$(function () {
  let formTeam = $('#formTeam')
  let divSuccess = $('#form-message-success')
  let divError = $('#form-message-error')

  let tDatatable = $('#team_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: `${path}/datatable`,
    columns: [
      { data: 'name', name: 'name' },
      { data: 'country_name', name: 'country_name' },
      { data: 'sport_name', name: 'sport_name' },
      { data: 'category_name', name: 'category_name' },
      { data: 'owner', name: 'owner' },
      { data: 'updater', name: 'created_at' },
      { data: 'created_at', name: 'created_at' },
      { data: 'updated_at', name: 'updated_at' },
      {data: 'action', name: 'action', orderable: false, searchable: false}
    ]
  })
  formTeam.validate({
    rules: {
      name: {required: true},
      home_uniform_id: {required: true},
      away_uniform_id: {required: true},
      category_id: {required: true},
      sport_id: {required: true}
    },
    highlight: function (element) { // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error') // set error class to the control group
    },
    unhighlight: function (element) { // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error') // set error class to the control group
    },
    submitHandler: function (form) {
      let method = formTeam.find('input[name="_method"]').val()
      let url = path
      if (method === 'PUT') {
        let teamId = formTeam.find('input[name="team_id"]').val()
        url = `${path}/${teamId}`
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
          resetForm(formTeam, ['_token', '_method'])
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

  $(document).on('click', '.teamEdit', function (ev) {
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
      setValue(formTeam, 'PUT')
      setValue(formTeam, data.id, 'team_id')
      $.each(obj.data, function (i, val) {
        $(`#formTeam *[name=${i}]`).val(val)
      })
      setValue('', data.sport_id, $('#team_sport_id'), 'select')
      setValue('', data.category_id, $('#team_category_id'), 'select')
      setValue('', data.away_uniform_id, $('#away_uniform_id'), 'select')
      setValue('', data.country_id, $('#team_country_id'), 'select')
      setValue('', data.home_uniform_id, $('#home_uniform_id'), 'select')
      /* setValue('', data.type_member_id, $('#type_member_id'), 'select')
      if (data.category_id && typeof (data.category_id) !== undefined) {
        setValue('', data.category_id, $('#category_id'), 'select')
      }
      if (data.position_id && typeof (data.position_id) !== undefined) {
        setValue('', data.position_id, $('#position_id'), 'select')
      }
      if (data.country_id) {
        setValue('', data.country_id, $('#country_id'), 'select', {stateId: data.state_id, cityId: data.city_id})
      } */
      $.each(obj.data, function (i, val) {
        $(`#formTeam *[name=${i}]`).val(val)
      })
      let box = $('#boxFormTeam')
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset'])
      }
      /* removeDivPassword($('.div_password'))
      removeDivPassword($('.div_confirm_password'))
      hideElement($('#generatePassword'), 1000) */
    })
    .fail(function (obj) {
      let description = generateMessageLog(obj)
      let data = {
        type_log_id: 1,
        module: 'Team (Function Edit)',
        description: JSON.stringify(description)
      }
      saveLog(divError, data)
    })
  })
})
