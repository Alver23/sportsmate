/*
Module Dependencies
 */
import { setValue, resetForm } from './util/'
import { createDivPassword } from './util/userUtil'
import './util/validation'
import './module/group'
import './module/typeMember'
import './module/permission'
import './module/role'
import './module/position'
import './module/category'
import './module/organization'
import './module/user'
import './module/uniform'
import './module/team'
import './module/league'

let $ = window.jQuery

$(document).on('click', '[data-widget=collapse2]', function (ev, param) {
  let content = $(this).closest('.box')
  let icon = $(this).find('.fa')
  let panelBody = content.find('.box-body')
  let form = panelBody.parent()
  if (!param) {
    setValue(form, 'POST')
    resetForm(form, ['_token', '_method'])
  }
  if (!content.hasClass('collapsed-box')) {
    icon.removeClass('fa-minus')
    .addClass('fa-plus')
    panelBody.slideUp(500, function () {
      content.addClass('collapsed-box')
    })
  } else {
    icon.removeClass('fa-plus')
    .addClass('fa-minus')
    panelBody.slideDown(500, function () {
      content.removeClass('collapsed-box')
    })

    if (form.attr('id') === 'formUser') {
      let divPassword = form.find('.div_password')
      let divPasswordConfirmation = form.find('.div_confirm_password')
      if (divPassword.find('.password').length < 1) {
        let html = createDivPassword('password')
        divPassword.append(html)
      }

      if (divPasswordConfirmation.find('.password').length < 1) {
        let html = createDivPassword('confirm_ password')
        divPasswordConfirmation.append(html)
      }
    }
  }
})

$('.select2').select2()
