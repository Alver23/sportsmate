/*
Module Dependencies
 */

import { showMessage, showElement, hideElement, resetForm, changeStatusButton, generateMessageLog, setValue } from '../util/'
import { saveLog } from '../api/'

let $ = window.jQuery
let path = window.location.href

$(function () {
  var tDatatable = $('#category_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: `${path}/getpager`,
    columns: [
      { data: 'name', name: 'categories.name' },
      { data: 'description', name: 'categories.description' },
      { data: 'owner', name: 'owner' },
      { data: 'updater', name: 'updater' },
      { data: 'created_at', name: 'categories.created_at' },
      { data: 'updated_at', name: 'categories.updated_at' },
      {data: 'action', name: 'action', orderable: false, searchable: false}
    ]
  })
  let formCategory = $('#formCategory')
  let divSuccess = $('#form-message-success')
  let divError = $('#form-message-error')
  let categoryInfo = $('#categoryInfo')
  let categoryName = $('#categoryName')
  let buttonSaveCategory = $('#buttonSaveCategory')
  formCategory.validate({
    rules: {
      name: {required: true},
      year: {required: true},
      season: {required: true}
    },
    highlight: function (element) { // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error') // set error class to the control group
    },
    unhighlight: function (element) { // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error') // set error class to the control group
    },
    submitHandler: function (form) {
      let method = formCategory.find('input[name="_method"]').val()
      let url = path
      if (method === 'PUT') {
        let categoryId = formCategory.find('input[name="category_id"]').val()
        url = `${path}/${categoryId}`
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
          resetForm(formCategory, ['_token', '_method'])
          showMessage(divSuccess, obj.message ? obj.message : '', false)
          $('#year').val('').trigger('change')
          $('#season').val('').trigger('change')
          setTimeout(() => {
            hideElement(divSuccess, 3000)
            $('[data-widget=collapse2]').trigger('click')
            tDatatable.fnClearTable(true)
            categoryInfo.html('').hide()
            buttonSaveCategory.hide()
          }, 1000)
          setValue(formCategory)
        },
        error: function (context, xhr, status, errMsg) {
          hideElement($('.modalLoading'), 800)
          if (context.status === 422) {
            let errors = context && context.responseText || {}
            errors = JSON.parse(errors)
            showMessage(divError, errors)
            categoryInfo.html('').hide()
            buttonSaveCategory.hide()
          }
          $('[data-widget=collapse2]').trigger('click')
        }
      })
    }
  })

  $(document).on('click', '.categoryDelete', function (ev) {
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

  $(document).on('click', '.categoryEdit', function (ev) {
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
      setValue(formCategory, 'PUT')
      setValue(formCategory, data.id, 'category_id')
      $.each(obj.data, function (i, val) {
        $(`#formCategory *[name=${i}]`).val(val)
      })
      $('#year').trigger('change')
      $('#season').trigger('change')
      $('#buttonCagetogy').trigger('click')
      let box = $('#boxForm')
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset'])
      }
    })
    .fail(function (obj) {
      console.log('error', obj)
    })
  })

  $(document).on('click', '#buttonCagetogy', function (ev) {
    ev.preventDefault()
    let season = parseInt($('#season').val())
    let year = parseInt($('#year').val())
    if (!isNaN(year) && !isNaN(season)) {
      let category = season + 1 - year
      category = `U-${category}`
      categoryName.val(category)
      categoryInfo.html(category).show()
      buttonSaveCategory.show()
    } else {
      categoryName.val('')
      categoryInfo.html('')
      buttonSaveCategory.hide()
    }
  })
})
