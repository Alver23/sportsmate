(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*! jquery-password-generator-plugin - v0.0.0 - 2015-10-23
* Copyright (c) 2015 Sergey Sokurenko; Licensed MIT */
(function ($) {
  $.passGen = function (options) {
    // Override default options with passed-in options
    options = $.extend({}, $.passGen.options, options);

    // Local varialbles declaration
    var charsets, charset = '', password = '', index;

    // Available character lists
    charsets = {
      'numeric'   : '0123456789',
      'lowercase' : 'abcdefghijklmnopqrstuvwxyz',
      'uppercase' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      'special'   : '~!@#$%^&*()-+[]{}<>?'
    };

    // Defining merged character set
    $.each(charsets, function(key, value) {
      if (options[key]) {
        charset += value;
      }
    });

    // Generating the password
    for (var i=0; i< options.length; i++) {
      // defining random character index
      index = Math.floor(Math.random() * (charset.length));
      // adding the character to the password
      password += charset[index];
    }

    // Returning generated password value
    return password;
  };

  // Default options
  $.passGen.options = {
    'length' : 10,
    'numeric' : true,
    'lowercase' : true,
    'uppercase' : true,
    'special'   : false
  };
}(jQuery));
},{}],2:[function(require,module,exports){
'use strict';

module.exports = function ucwords(str) {
  //  discuss at: http://locutus.io/php/ucwords/
  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // improved by: Waldo Malqui Silva (http://waldo.malqui.info)
  // improved by: Robin
  // improved by: Kevin van Zonneveld (http://kvz.io)
  // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
  //    input by: James (http://www.james-bell.co.uk/)
  //   example 1: ucwords('kevin van  zonneveld')
  //   returns 1: 'Kevin Van  Zonneveld'
  //   example 2: ucwords('HELLO WORLD')
  //   returns 2: 'HELLO WORLD'

  return (str + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
    return $1.toUpperCase();
  });
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveLog = saveLog;
exports.getCountry = getCountry;
exports.getStateByCountry = getStateByCountry;
exports.getCityByState = getCityByState;

var _util = require('../util/');

var $ = window.jQuery;
var hotsName = window.location.origin;

function saveLog(element, data) {
  if ((0, _util.objectLength)(data) < 1) {
    return false;
  }
  $.ajax({
    url: hotsName + '/logs',
    type: 'post',
    dataType: 'json',
    data: data
  }).done(function (obj) {
    (0, _util.showMessage)(element, obj.message ? obj.message : '', false);
  });
}

function getCountry(fn) {
  $.get('countries', function (data) {
    fn(data);
  });
}

function getStateByCountry(countryId, fn) {
  $.get('country/' + countryId + '/states', function (data) {
    fn(data);
  });
}

function getCityByState(stateId, fn) {
  $.get('state/' + stateId + '/cities', function (data) {
    fn(data);
  });
}

},{"../util/":16}],4:[function(require,module,exports){
'use strict';

var _util = require('./util/');

var _userUtil = require('./util/userUtil');

require('./util/validation');

require('./module/group');

require('./module/typeMember');

require('./module/permission');

require('./module/role');

require('./module/position');

require('./module/category');

require('./module/organization');

require('./module/user');

require('./module/uniform');

require('./module/team');

require('./module/league');

/*
Module Dependencies
 */
var $ = window.jQuery;

$(document).on('click', '[data-widget=collapse2]', function (ev, param) {
  var content = $(this).closest('.box');
  var icon = $(this).find('.fa');
  var panelBody = content.find('.box-body');
  var form = panelBody.parent();
  if (!param) {
    (0, _util.setValue)(form, 'POST');
    (0, _util.resetForm)(form, ['_token', '_method']);
  }
  if (!content.hasClass('collapsed-box')) {
    icon.removeClass('fa-minus').addClass('fa-plus');
    panelBody.slideUp(500, function () {
      content.addClass('collapsed-box');
    });
  } else {
    icon.removeClass('fa-plus').addClass('fa-minus');
    panelBody.slideDown(500, function () {
      content.removeClass('collapsed-box');
    });

    if (form.attr('id') === 'formUser') {
      var divPassword = form.find('.div_password');
      var divPasswordConfirmation = form.find('.div_confirm_password');
      if (divPassword.find('.password').length < 1) {
        var html = (0, _userUtil.createDivPassword)('password');
        divPassword.append(html);
      }

      if (divPasswordConfirmation.find('.password').length < 1) {
        var _html = (0, _userUtil.createDivPassword)('confirm_ password');
        divPasswordConfirmation.append(_html);
      }
    }
  }
});

$('.select2').select2();

},{"./module/category":5,"./module/group":6,"./module/league":7,"./module/organization":8,"./module/permission":9,"./module/position":10,"./module/role":11,"./module/team":12,"./module/typeMember":13,"./module/uniform":14,"./module/user":15,"./util/":16,"./util/userUtil":17,"./util/validation":18}],5:[function(require,module,exports){
'use strict';

var _util = require('../util/');

var _api = require('../api/');

/*
Module Dependencies
 */

var $ = window.jQuery;
var path = window.location.href;

$(function () {
  var tDatatable = $('#category_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: path + '/getpager',
    columns: [{ data: 'name', name: 'categories.name' }, { data: 'description', name: 'categories.description' }, { data: 'owner', name: 'owner' }, { data: 'updater', name: 'updater' }, { data: 'created_at', name: 'categories.created_at' }, { data: 'updated_at', name: 'categories.updated_at' }, { data: 'action', name: 'action', orderable: false, searchable: false }]
  });
  var formCategory = $('#formCategory');
  var divSuccess = $('#form-message-success');
  var divError = $('#form-message-error');
  var categoryInfo = $('#categoryInfo');
  var categoryName = $('#categoryName');
  var buttonSaveCategory = $('#buttonSaveCategory');
  formCategory.validate({
    rules: {
      name: { required: true },
      year: { required: true },
      season: { required: true }
    },
    highlight: function highlight(element) {
      // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
    },
    unhighlight: function unhighlight(element) {
      // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
    },
    submitHandler: function submitHandler(form) {
      var method = formCategory.find('input[name="_method"]').val();
      var url = path;
      if (method === 'PUT') {
        var categoryId = formCategory.find('input[name="category_id"]').val();
        url = path + '/' + categoryId;
      }
      console.log(url);
      $(form).ajaxSubmit({
        url: '' + url,
        type: 'post',
        dataType: 'json',
        beforeSubmit: function beforeSubmit(arr, $form, options) {
          (0, _util.showElement)($('.modalLoading'));
        },
        success: function success(obj, statusText, xhr, $form) {
          (0, _util.hideElement)(divError, 500);
          (0, _util.hideElement)($('.modalLoading'), 2000);
          (0, _util.resetForm)(formCategory, ['_token', '_method']);
          (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
          $('#year').val('').trigger('change');
          $('#season').val('').trigger('change');
          setTimeout(function () {
            (0, _util.hideElement)(divSuccess, 3000);
            $('[data-widget=collapse2]').trigger('click');
            tDatatable.fnClearTable(true);
            categoryInfo.html('').hide();
            buttonSaveCategory.hide();
          }, 1000);
          (0, _util.setValue)(formCategory);
        },
        error: function error(context, xhr, status, errMsg) {
          (0, _util.hideElement)($('.modalLoading'), 800);
          if (context.status === 422) {
            var errors = context && context.responseText || {};
            errors = JSON.parse(errors);
            (0, _util.showMessage)(divError, errors);
            categoryInfo.html('').hide();
            buttonSaveCategory.hide();
          }
          $('[data-widget=collapse2]').trigger('click');
        }
      });
    }
  });

  $(document).on('click', '.categoryDelete', function (ev) {
    ev.preventDefault();
    var button = $(this);
    var form = $(this).parent();
    var method = form.find('input[name="_method"]').val();
    var token = form.find('input[name="_token"]').val();
    var url = form.attr('action');
    var data = {
      _method: method,
      _token: token
    };
    (0, _util.showElement)($('.modalLoading'));
    (0, _util.changeStatusButton)($(this));
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data
    }).done(function (obj) {
      (0, _util.changeStatusButton)(button, false);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
      setTimeout(function () {
        (0, _util.hideElement)(divSuccess, 3000);
        tDatatable.fnClearTable(true);
      }, 1000);
    }).fail(function (error) {
      var description = (0, _util.generateMessageLog)(error);
      var data = {
        type_log_id: 1,
        module: 'Groups (Function Delete)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.changeStatusButton)(button, false);
      setTimeout(function () {
        (0, _util.hideElement)(divError, 3000);
      }, 1000);
    });
  });

  $(document).on('click', '.categoryEdit', function (ev) {
    var id = $(this).data('id');
    if (!id) {
      return false;
    }
    $.ajax({
      url: path + '/' + id + '/edit',
      type: 'GET',
      dataType: 'json'
    }).done(function (obj) {
      var data = obj.data;
      (0, _util.setValue)(formCategory, 'PUT');
      (0, _util.setValue)(formCategory, data.id, 'category_id');
      $.each(obj.data, function (i, val) {
        $('#formCategory *[name=' + i + ']').val(val);
      });
      $('#year').trigger('change');
      $('#season').trigger('change');
      $('#buttonCagetogy').trigger('click');
      var box = $('#boxForm');
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset']);
      }
    }).fail(function (obj) {
      console.log('error', obj);
    });
  });

  $(document).on('click', '#buttonCagetogy', function (ev) {
    ev.preventDefault();
    var season = parseInt($('#season').val());
    var year = parseInt($('#year').val());
    if (!isNaN(year) && !isNaN(season)) {
      var category = season + 1 - year;
      category = 'U-' + category;
      categoryName.val(category);
      categoryInfo.html(category).show();
      buttonSaveCategory.show();
    } else {
      categoryName.val('');
      categoryInfo.html('');
      buttonSaveCategory.hide();
    }
  });
});

},{"../api/":3,"../util/":16}],6:[function(require,module,exports){
'use strict';

var _util = require('../util/');

var _api = require('../api/');

/*
Module Dependencies
 */

var $ = window.jQuery;
var path = window.location.href;

$(function () {
  var tDatatable = $('#users-table').dataTable({
    processing: true,
    serverSide: true,
    ajax: path + '/getpager',
    columns: [{ data: 'name', name: 'type_member.name' }, { data: 'description', name: 'type_member.description' }, { data: 'owner', name: 'owner' }, { data: 'updater', name: 'updater' }, { data: 'created_at', name: 'type_member.created_at' }, { data: 'updated_at', name: 'type_member.updated_at' }, { data: 'action', name: 'action', orderable: false, searchable: false }]
  });
  var formGroup = $('#formGroup');
  var divSuccess = $('#form-message-success');
  var divError = $('#form-message-error');
  formGroup.validate({
    rules: {
      name: { required: true }
    },
    highlight: function highlight(element) {
      // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
    },
    unhighlight: function unhighlight(element) {
      // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
    },
    submitHandler: function submitHandler(form) {
      var method = formGroup.find('input[name="_method"]').val();
      var url = path;
      if (method === 'PUT') {
        var groupId = formGroup.find('input[name="group_id"]').val();
        url = path + '/' + groupId;
      }
      console.log(url);
      $(form).ajaxSubmit({
        url: '' + url,
        type: 'post',
        dataType: 'json',
        beforeSubmit: function beforeSubmit(arr, $form, options) {
          (0, _util.showElement)($('.modalLoading'));
        },
        success: function success(obj, statusText, xhr, $form) {
          (0, _util.hideElement)(divError, 500);
          (0, _util.hideElement)($('.modalLoading'), 2000);
          (0, _util.resetForm)(formGroup, ['_token', '_method']);
          (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
          setTimeout(function () {
            (0, _util.hideElement)(divSuccess, 3000);
            $('[data-widget=collapse2]').trigger('click');
            tDatatable.fnClearTable(true);
          }, 1000);
          (0, _util.setValue)(formGroup);
        },
        error: function error(context, xhr, status, errMsg) {
          (0, _util.hideElement)($('.modalLoading'), 800);
          if (context.status === 422) {
            var errors = context && context.responseText || {};
            errors = JSON.parse(errors);
            (0, _util.showMessage)(divError, errors);
          }
          $('[data-widget=collapse2]').trigger('click');
        }
      });
    }
  });

  $(document).on('click', '.buttonDelete', function (ev) {
    ev.preventDefault();
    var button = $(this);
    var form = $(this).parent();
    var method = form.find('input[name="_method"]').val();
    var token = form.find('input[name="_token"]').val();
    var url = form.attr('action');
    var data = {
      _method: method,
      _token: token
    };
    (0, _util.showElement)($('.modalLoading'));
    (0, _util.changeStatusButton)($(this));
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data
    }).done(function (obj) {
      (0, _util.changeStatusButton)(button, false);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
      setTimeout(function () {
        (0, _util.hideElement)(divSuccess, 3000);
        tDatatable.fnClearTable(true);
      }, 1000);
    }).fail(function (error) {
      var description = (0, _util.generateMessageLog)(error);
      var data = {
        type_log_id: 1,
        module: 'Groups (Function Delete)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.changeStatusButton)(button, false);
      setTimeout(function () {
        (0, _util.hideElement)(divError, 3000);
      }, 1000);
    });
  });

  $(document).on('click', '.edit', function (ev) {
    var id = $(this).data('id');
    if (!id) {
      return false;
    }
    $.ajax({
      url: path + '/' + id + '/edit',
      type: 'GET',
      dataType: 'json'
    }).done(function (obj) {
      var data = obj.data;
      (0, _util.setValue)(formGroup, 'PUT');
      (0, _util.setValue)(formGroup, data.id, 'group_id');
      $.each(obj.data, function (i, val) {
        $('#formGroup *[name=' + i + ']').val(val);
      });
      var box = $('#boxForm');
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset']);
      }
    }).fail(function (obj) {
      console.log('error', obj);
    });
  });
});

},{"../api/":3,"../util/":16}],7:[function(require,module,exports){
'use strict';

var _util = require('../util/');

var _api = require('../api/');

/**
 * Module Dependencies
 */

var $ = window.jQuery;
var path = window.location.href;

$(function () {
  var formLeague = $('#formLeague');
  var divSuccess = $('#form-message-success');
  var divError = $('#form-message-error');

  var tDatatable = $('#league_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: path + '/datatable',
    columns: [{ data: 'name', name: 'name' }, { data: 'country_name', name: 'country_name' }, { data: 'sport_name', name: 'sport_name' }, { data: 'points', name: 'points' }, { data: 'owner', name: 'owner' }, { data: 'updater', name: 'created_at' }, { data: 'created_at', name: 'created_at' }, { data: 'updated_at', name: 'updated_at' }, { data: 'action', name: 'action', orderable: false, searchable: false }]
  });
  formLeague.validate({
    rules: {
      name: { required: true },
      sport_id: { required: true }
    },
    highlight: function highlight(element) {
      // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
    },
    unhighlight: function unhighlight(element) {
      // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
    },
    submitHandler: function submitHandler(form) {
      var method = formLeague.find('input[name="_method"]').val();
      var url = path;
      if (method === 'PUT') {
        var leagueId = formLeague.find('input[name="league_id"]').val();
        url = path + '/' + leagueId;
      }
      $(form).ajaxSubmit({
        url: '' + url,
        type: 'post',
        dataType: 'json',
        beforeSubmit: function beforeSubmit(arr, $form, options) {
          (0, _util.showElement)($('.modalLoading'));
        },
        success: function success(obj, statusText, xhr, $form) {
          (0, _util.hideElement)(divError, 500);
          (0, _util.hideElement)($('.modalLoading'), 2000);
          (0, _util.resetForm)(formLeague, ['_token', '_method']);
          (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
          setTimeout(function () {
            (0, _util.hideElement)(divSuccess, 3000);
            $('[data-widget=collapse2]').trigger('click');
            tDatatable.fnClearTable(true);
          }, 1000);
        },
        error: function error(context, xhr, status, errMsg) {
          (0, _util.hideElement)($('.modalLoading'), 800);
          if (context.status === 422) {
            var errors = context && context.responseText || {};
            errors = JSON.parse(errors);
            (0, _util.showMessage)(divError, errors);
          }
        }
      });
    }
  });

  $(document).on('click', '.leagueEdit', function (ev) {
    var id = $(this).data('id');
    if (!id) {
      return false;
    }
    var button = $(this);
    (0, _util.showElement)($('.modalLoading'));
    (0, _util.changeStatusButton)(button);
    $.ajax({
      url: path + '/' + id + '/edit',
      type: 'GET',
      dataType: 'json'
    }).done(function (obj) {
      var data = obj.data;
      (0, _util.changeStatusButton)(button, false);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.setValue)(formLeague, 'PUT');
      (0, _util.setValue)(formLeague, data.id, 'league_id');
      $.each(obj.data, function (i, val) {
        $('#formLeague *[name=' + i + ']').val(val);
      });
      (0, _util.setValue)('', data.sport_id, $('#league_sport_id'), 'select');
      (0, _util.setValue)('', data.country_id, $('#league_country_id'), 'select');
      $.each(obj.data, function (i, val) {
        $('#formLeague *[name=' + i + ']').val(val);
      });
      var box = $('#boxFormLeague');
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset']);
      }
    }).fail(function (obj) {
      var description = (0, _util.generateMessageLog)(obj);
      var data = {
        type_log_id: 1,
        module: 'League (Function Edit)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
    });
  });
});

},{"../api/":3,"../util/":16}],8:[function(require,module,exports){
'use strict';

var _util = require('../util/');

var _api = require('../api/');

/*
Module Dependencies
 */

var $ = window.jQuery;
var path = window.location.href;

$(function () {
  var tDatatable = $('#organization_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: path + '/getpager',
    columns: [{ data: 'name', name: 'organization.name' }, { data: 'email', name: 'organization.email' }, { data: 'phone', name: 'organization.phone' }, { data: 'description', name: 'organization.description' }, { data: 'owner', name: 'owner' }, { data: 'updater', name: 'updater' }, { data: 'created_at', name: 'organization.created_at' }, { data: 'updated_at', name: 'organization.updated_at' }, { data: 'action', name: 'action', orderable: false, searchable: false }]
  });
  var formOrganization = $('#formOrganization');
  var divSuccess = $('#form-message-success');
  var divError = $('#form-message-error');
  formOrganization.validate({
    rules: {
      name: { required: true }
    },
    highlight: function highlight(element) {
      // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
    },
    unhighlight: function unhighlight(element) {
      // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
    },
    submitHandler: function submitHandler(form) {
      var method = formOrganization.find('input[name="_method"]').val();
      var url = path;
      if (method === 'PUT') {
        var organizationId = formOrganization.find('input[name="organization_id"]').val();
        url = path + '/' + organizationId;
      }
      console.log(url);
      $(form).ajaxSubmit({
        url: '' + url,
        type: 'post',
        dataType: 'json',
        beforeSubmit: function beforeSubmit(arr, $form, options) {
          (0, _util.showElement)($('.modalLoading'));
        },
        success: function success(obj, statusText, xhr, $form) {
          (0, _util.hideElement)(divError, 500);
          (0, _util.hideElement)($('.modalLoading'), 2000);
          (0, _util.resetForm)(formOrganization, ['_token', '_method']);
          (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
          setTimeout(function () {
            (0, _util.hideElement)(divSuccess, 3000);
            $('[data-widget=collapse2]').trigger('click');
            tDatatable.fnClearTable(true);
          }, 1000);
          (0, _util.setValue)(formOrganization);
        },
        error: function error(context, xhr, status, errMsg) {
          (0, _util.hideElement)($('.modalLoading'), 800);
          if (context.status === 422) {
            var errors = context && context.responseText || {};
            errors = JSON.parse(errors);
            (0, _util.showMessage)(divError, errors);
            return;
          }
          var description = (0, _util.generateMessageLog)(context);
          var data = {
            type_log_id: 1,
            module: 'Organizations (Function ' + method + ')',
            description: JSON.stringify(description)
          };
          (0, _api.saveLog)(divError, data);
        }
      });
    }
  });

  $(document).on('click', '.organizationDelete', function (ev) {
    ev.preventDefault();
    var button = $(this);
    var form = $(this).parent();
    var method = form.find('input[name="_method"]').val();
    var token = form.find('input[name="_token"]').val();
    var url = form.attr('action');
    var data = {
      _method: method,
      _token: token
    };
    (0, _util.showElement)($('.modalLoading'));
    (0, _util.changeStatusButton)($(this));
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data
    }).done(function (obj) {
      (0, _util.changeStatusButton)(button, false);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
      setTimeout(function () {
        (0, _util.hideElement)(divSuccess, 3000);
        tDatatable.fnClearTable(true);
      }, 1000);
    }).fail(function (error) {
      var description = (0, _util.generateMessageLog)(error);
      var data = {
        type_log_id: 1,
        module: 'Groups (Function Delete)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.changeStatusButton)(button, false);
      setTimeout(function () {
        (0, _util.hideElement)(divError, 3000);
      }, 1000);
    });
  });

  $(document).on('click', '.organizationEdit', function (ev) {
    var id = $(this).data('id');
    if (!id) {
      return false;
    }
    $.ajax({
      url: path + '/' + id + '/edit',
      type: 'GET',
      dataType: 'json'
    }).done(function (obj) {
      var data = obj.data;
      (0, _util.setValue)(formOrganization, 'PUT');
      (0, _util.setValue)(formOrganization, data.id, 'organization_id');
      $.each(obj.data, function (i, val) {
        $('#formOrganization *[name=' + i + ']').val(val);
      });
      var box = $('#boxForm');
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset']);
      }
    }).fail(function (obj) {
      var description = (0, _util.generateMessageLog)(obj);
      var data = {
        type_log_id: 1,
        module: 'Organizations (Function Edit)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
    });
  });
});

},{"../api/":3,"../util/":16}],9:[function(require,module,exports){
'use strict';

var _util = require('../util/');

var _api = require('../api/');

/**
 * Module Dependencies
 */

var $ = window.jQuery;
var path = window.location.href;

$(function () {
  var formPermission = $('#formPermission');
  var divSuccess = $('#form-message-success');
  var divError = $('#form-message-error');

  var permissionDataTable = $('#permission_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: path + '/getpager',
    columns: [{ data: 'name', name: 'permission.name' }, { data: 'description', name: 'permission.description' }, { data: 'owner', name: 'owner' }, { data: 'updater', name: 'updater' }, { data: 'created_at', name: 'permission.created_at' }, { data: 'updated_at', name: 'permission.updated_at' }, { data: 'action', name: 'action', orderable: false, searchable: false }]
  });

  formPermission.validate({
    rules: {
      name: { required: true }
    },
    highlight: function highlight(element) {
      // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
    },
    unhighlight: function unhighlight(element) {
      // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
    },
    submitHandler: function submitHandler(form) {
      var method = formPermission.find('input[name="_method"]').val();
      var url = path;
      if (method === 'PUT') {
        var permissionId = formPermission.find('input[name="permission_id"]').val();
        url = path + '/' + permissionId;
      }
      $(form).ajaxSubmit({
        url: '' + url,
        type: 'post',
        dataType: 'json',
        beforeSubmit: function beforeSubmit(arr, $form, options) {
          (0, _util.showElement)($('.modalLoading'));
        },
        success: function success(obj, statusText, xhr, $form) {
          (0, _util.hideElement)(divError, 500);
          (0, _util.hideElement)($('.modalLoading'), 2000);
          (0, _util.resetForm)(formPermission, ['_token', '_method']);
          (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
          setTimeout(function () {
            (0, _util.hideElement)(divSuccess, 3000);
            $('[data-widget=collapse2]').trigger('click');
            permissionDataTable.fnClearTable(true);
          }, 1000);
          (0, _util.setValue)(formPermission);
        },
        error: function error(context, xhr, status, errMsg) {
          (0, _util.hideElement)($('.modalLoading'), 800);
          if (context.status === 422) {
            var errors = context && context.responseText || {};
            errors = JSON.parse(errors);
            (0, _util.showMessage)(divError, errors);
          }
          $('[data-widget=collapse2]').trigger('click');
        }
      });
    }
  });

  $(document).on('click', '.permissionEdit', function (ev) {
    var id = $(this).data('id');
    if (!id) {
      return false;
    }
    $.ajax({
      url: path + '/' + id + '/edit',
      type: 'GET',
      dataType: 'json'
    }).done(function (obj) {
      var data = obj.data;
      (0, _util.setValue)(formPermission, 'PUT');
      (0, _util.setValue)(formPermission, data.id, 'permission_id');
      $.each(obj.data, function (i, val) {
        $('#formPermission *[name=' + i + ']').val(val);
      });
      var box = $('#boxForm');
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset']);
      }
    }).fail(function (obj) {
      console.log('error', obj);
    });
  });

  $(document).on('click', '.permissionDelete', function (ev) {
    ev.preventDefault();
    var button = $(this);
    var form = $(this).parent();
    var method = form.find('input[name="_method"]').val();
    var token = form.find('input[name="_token"]').val();
    var url = form.attr('action');
    var data = {
      _method: method,
      _token: token
    };
    (0, _util.showElement)($('.modalLoading'));
    (0, _util.changeStatusButton)($(this));
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data
    }).done(function (obj) {
      (0, _util.changeStatusButton)(button, false);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
      setTimeout(function () {
        (0, _util.hideElement)(divSuccess, 3000);
        permissionDataTable.fnClearTable(true);
      }, 1000);
    }).fail(function (error) {
      var description = (0, _util.generateMessageLog)(error);
      var data = {
        type_log_id: 1,
        module: 'Permission (Function Delete)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.changeStatusButton)(button, false);
      setTimeout(function () {
        (0, _util.hideElement)(divError, 3000);
      }, 1000);
    });
  });
});

},{"../api/":3,"../util/":16}],10:[function(require,module,exports){
'use strict';

var _util = require('../util/');

var _api = require('../api/');

/**
 * Module Dependencies
 */

var $ = window.jQuery;
var path = window.location.href;

$(function () {
  var formPosition = $('#formPosition');
  var divSuccess = $('#form-message-success');
  var divError = $('#form-message-error');
  var positionDataTable = $('#position_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: path + '/getpager',
    columns: [{ data: 'name', name: 'position.name' }, { data: 'description', name: 'position.description' }, { data: 'owner', name: 'owner' }, { data: 'updater', name: 'updater' }, { data: 'created_at', name: 'position.created_at' }, { data: 'updated_at', name: 'position.updated_at' }, { data: 'action', name: 'action', orderable: false, searchable: false }]
  });

  formPosition.validate({
    rules: {
      name: { required: true }
    },
    highlight: function highlight(element) {
      // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
    },
    unhighlight: function unhighlight(element) {
      // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
    },
    submitHandler: function submitHandler(form) {
      var method = formPosition.find('input[name="_method"]').val();
      var url = path;
      if (method === 'PUT') {
        var positionId = formPosition.find('input[name="position_id"]').val();
        url = path + '/' + positionId;
      }
      $(form).ajaxSubmit({
        url: '' + url,
        type: 'post',
        dataType: 'json',
        beforeSubmit: function beforeSubmit(arr, $form, options) {
          (0, _util.showElement)($('.modalLoading'));
        },
        success: function success(obj, statusText, xhr, $form) {
          (0, _util.hideElement)(divError, 500);
          (0, _util.hideElement)($('.modalLoading'), 2000);
          (0, _util.resetForm)(formPosition, ['_token', '_method']);
          (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
          setTimeout(function () {
            (0, _util.hideElement)(divSuccess, 3000);
            $('[data-widget=collapse2]').trigger('click');
            positionDataTable.fnClearTable(true);
          }, 1000);
          (0, _util.setValue)(formPosition);
        },
        error: function error(context, xhr, status, errMsg) {
          (0, _util.hideElement)($('.modalLoading'), 800);
          if (context.status === 422) {
            var errors = context && context.responseText || {};
            errors = JSON.parse(errors);
            (0, _util.showMessage)(divError, errors);
          }
          $('[data-widget=collapse2]').trigger('click');
        }
      });
    }
  });

  $(document).on('click', '.positionEdit', function (ev) {
    var id = $(this).data('id');
    if (!id) {
      return false;
    }
    $.ajax({
      url: path + '/' + id + '/edit',
      type: 'GET',
      dataType: 'json'
    }).done(function (obj) {
      var data = obj.data;
      (0, _util.setValue)(formPosition, 'PUT');
      (0, _util.setValue)(formPosition, data.id, 'position_id');
      $.each(obj.data, function (i, val) {
        $('#formPosition *[name=' + i + ']').val(val);
      });
      var box = $('#boxForm');
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset']);
      }
    }).fail(function (obj) {
      console.log('error', obj);
    });
  });

  $(document).on('click', '.positionDelete', function (ev) {
    ev.preventDefault();
    var button = $(this);
    var form = $(this).parent();
    var method = form.find('input[name="_method"]').val();
    var token = form.find('input[name="_token"]').val();
    var url = form.attr('action');
    var data = {
      _method: method,
      _token: token
    };
    (0, _util.showElement)($('.modalLoading'));
    (0, _util.changeStatusButton)($(this));
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data
    }).done(function (obj) {
      (0, _util.changeStatusButton)(button, false);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
      setTimeout(function () {
        (0, _util.hideElement)(divSuccess, 3000);
        positionDataTable.fnClearTable(true);
      }, 1000);
    }).fail(function (error) {
      var description = (0, _util.generateMessageLog)(error);
      var data = {
        type_log_id: 1,
        module: 'Position (Function Delete)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.changeStatusButton)(button, false);
      setTimeout(function () {
        (0, _util.hideElement)(divError, 3000);
      }, 1000);
    });
  });
});

},{"../api/":3,"../util/":16}],11:[function(require,module,exports){
'use strict';

var _util = require('../util/');

var _api = require('../api/');

/**
 * Module Dependencies
 */

var $ = window.jQuery;
var path = window.location.href;

$(function () {
  var formRole = $('#formRole');
  var divSuccess = $('#form-message-success');
  var divError = $('#form-message-error');

  var roleDataTable = $('#role_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: path + '/getpager',
    columns: [{ data: 'name', name: 'role.name' }, { data: 'description', name: 'role.description' }, { data: 'owner', name: 'owner' }, { data: 'updater', name: 'updater' }, { data: 'created_at', name: 'role.created_at' }, { data: 'updated_at', name: 'role.updated_at' }, { data: 'action', name: 'action', orderable: false, searchable: false }]
  });

  formRole.validate({
    rules: {
      name: { required: true }
    },
    highlight: function highlight(element) {
      // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
    },
    unhighlight: function unhighlight(element) {
      // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
    },
    submitHandler: function submitHandler(form) {
      var method = formRole.find('input[name="_method"]').val();
      var url = path;
      if (method === 'PUT') {
        var roleId = formRole.find('input[name="role_id"]').val();
        url = path + '/' + roleId;
      }
      $(form).ajaxSubmit({
        url: '' + url,
        type: 'post',
        dataType: 'json',
        beforeSubmit: function beforeSubmit(arr, $form, options) {
          (0, _util.showElement)($('.modalLoading'));
        },
        success: function success(obj, statusText, xhr, $form) {
          (0, _util.hideElement)(divError, 500);
          (0, _util.hideElement)($('.modalLoading'), 2000);
          (0, _util.resetForm)(formRole, ['_token', '_method']);
          (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
          setTimeout(function () {
            (0, _util.hideElement)(divSuccess, 3000);
            $('[data-widget=collapse2]').trigger('click');
            roleDataTable.fnClearTable(true);
          }, 1000);
          (0, _util.setValue)(formRole);
        },
        error: function error(context, xhr, status, errMsg) {
          (0, _util.hideElement)($('.modalLoading'), 800);
          if (context.status === 422) {
            var errors = context && context.responseText || {};
            errors = JSON.parse(errors);
            (0, _util.showMessage)(divError, errors);
          }
          $('[data-widget=collapse2]').trigger('click');
        }
      });
    }
  });

  $(document).on('click', '.roleEdit', function (ev) {
    var id = $(this).data('id');
    if (!id) {
      return false;
    }
    $.ajax({
      url: path + '/' + id + '/edit',
      type: 'GET',
      dataType: 'json'
    }).done(function (obj) {
      var data = obj.data;
      (0, _util.setValue)(formRole, 'PUT');
      (0, _util.setValue)(formRole, data.id, 'role_id');
      $.each(obj.data, function (i, val) {
        $('#formRole *[name=' + i + ']').val(val);
      });
      var box = $('#boxForm');
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset']);
      }
    }).fail(function (obj) {
      console.log('error', obj);
    });
  });

  $(document).on('click', '.roleDelete', function (ev) {
    ev.preventDefault();
    var button = $(this);
    var form = $(this).parent();
    var method = form.find('input[name="_method"]').val();
    var token = form.find('input[name="_token"]').val();
    var url = form.attr('action');
    var data = {
      _method: method,
      _token: token
    };
    (0, _util.showElement)($('.modalLoading'));
    (0, _util.changeStatusButton)($(this));
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data
    }).done(function (obj) {
      (0, _util.changeStatusButton)(button, false);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
      setTimeout(function () {
        (0, _util.hideElement)(divSuccess, 3000);
        roleDataTable.fnClearTable(true);
      }, 1000);
    }).fail(function (error) {
      var description = (0, _util.generateMessageLog)(error);
      var data = {
        type_log_id: 1,
        module: 'Role (Function Delete)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.changeStatusButton)(button, false);
      setTimeout(function () {
        (0, _util.hideElement)(divError, 3000);
      }, 1000);
    });
  });
});

},{"../api/":3,"../util/":16}],12:[function(require,module,exports){
'use strict';

var _util = require('../util/');

var _api = require('../api/');

/**
 * Module Dependencies
 */

var $ = window.jQuery;
var path = window.location.href;

$(function () {
  var formTeam = $('#formTeam');
  var divSuccess = $('#form-message-success');
  var divError = $('#form-message-error');

  var tDatatable = $('#team_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: path + '/datatable',
    columns: [{ data: 'name', name: 'name' }, { data: 'country_name', name: 'country_name' }, { data: 'sport_name', name: 'sport_name' }, { data: 'category_name', name: 'category_name' }, { data: 'owner', name: 'owner' }, { data: 'updater', name: 'created_at' }, { data: 'created_at', name: 'created_at' }, { data: 'updated_at', name: 'updated_at' }, { data: 'action', name: 'action', orderable: false, searchable: false }]
  });
  formTeam.validate({
    rules: {
      name: { required: true },
      home_uniform_id: { required: true },
      away_uniform_id: { required: true },
      category_id: { required: true },
      sport_id: { required: true }
    },
    highlight: function highlight(element) {
      // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
    },
    unhighlight: function unhighlight(element) {
      // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
    },
    submitHandler: function submitHandler(form) {
      var method = formTeam.find('input[name="_method"]').val();
      var url = path;
      if (method === 'PUT') {
        var teamId = formTeam.find('input[name="team_id"]').val();
        url = path + '/' + teamId;
      }
      $(form).ajaxSubmit({
        url: '' + url,
        type: 'post',
        dataType: 'json',
        beforeSubmit: function beforeSubmit(arr, $form, options) {
          (0, _util.showElement)($('.modalLoading'));
        },
        success: function success(obj, statusText, xhr, $form) {
          (0, _util.hideElement)(divError, 500);
          (0, _util.hideElement)($('.modalLoading'), 2000);
          (0, _util.resetForm)(formTeam, ['_token', '_method']);
          (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
          setTimeout(function () {
            (0, _util.hideElement)(divSuccess, 3000);
            $('[data-widget=collapse2]').trigger('click');
            tDatatable.fnClearTable(true);
          }, 1000);
        },
        error: function error(context, xhr, status, errMsg) {
          (0, _util.hideElement)($('.modalLoading'), 800);
          if (context.status === 422) {
            var errors = context && context.responseText || {};
            errors = JSON.parse(errors);
            (0, _util.showMessage)(divError, errors);
          }
        }
      });
    }
  });

  $(document).on('click', '.teamEdit', function (ev) {
    var id = $(this).data('id');
    if (!id) {
      return false;
    }
    var button = $(this);
    (0, _util.showElement)($('.modalLoading'));
    (0, _util.changeStatusButton)(button);
    $.ajax({
      url: path + '/' + id + '/edit',
      type: 'GET',
      dataType: 'json'
    }).done(function (obj) {
      var data = obj.data;
      (0, _util.changeStatusButton)(button, false);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.setValue)(formTeam, 'PUT');
      (0, _util.setValue)(formTeam, data.id, 'team_id');
      $.each(obj.data, function (i, val) {
        $('#formTeam *[name=' + i + ']').val(val);
      });
      (0, _util.setValue)('', data.sport_id, $('#team_sport_id'), 'select');
      (0, _util.setValue)('', data.category_id, $('#team_category_id'), 'select');
      (0, _util.setValue)('', data.away_uniform_id, $('#away_uniform_id'), 'select');
      (0, _util.setValue)('', data.country_id, $('#team_country_id'), 'select');
      (0, _util.setValue)('', data.home_uniform_id, $('#home_uniform_id'), 'select');
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
        $('#formTeam *[name=' + i + ']').val(val);
      });
      var box = $('#boxFormTeam');
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset']);
      }
      /* removeDivPassword($('.div_password'))
      removeDivPassword($('.div_confirm_password'))
      hideElement($('#generatePassword'), 1000) */
    }).fail(function (obj) {
      var description = (0, _util.generateMessageLog)(obj);
      var data = {
        type_log_id: 1,
        module: 'Team (Function Edit)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
    });
  });
});

},{"../api/":3,"../util/":16}],13:[function(require,module,exports){
'use strict';

var _util = require('../util/');

var _api = require('../api/');

/**
 * Module Dependencies
 */

var $ = window.jQuery;
var path = window.location.href;

$(function () {
  var formTypeMember = $('#formTypeMember');
  var divSuccess = $('#form-message-success');
  var divError = $('#form-message-error');

  var typeMemberDataTable = $('#type_member_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: path + '/getpager',
    columns: [{ data: 'name', name: 'type_member.name' }, { data: 'description', name: 'type_member.description' }, { data: 'owner', name: 'owner' }, { data: 'updater', name: 'updater' }, { data: 'created_at', name: 'type_member.created_at' }, { data: 'updated_at', name: 'type_member.updated_at' }, { data: 'action', name: 'action', orderable: false, searchable: false }]
  });

  formTypeMember.validate({
    rules: {
      name: { required: true }
    },
    highlight: function highlight(element) {
      // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
    },
    unhighlight: function unhighlight(element) {
      // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
    },
    submitHandler: function submitHandler(form) {
      var method = formTypeMember.find('input[name="_method"]').val();
      var url = path;
      if (method === 'PUT') {
        var typeMemberId = formTypeMember.find('input[name="type_member_id"]').val();
        url = path + '/' + typeMemberId;
      }
      $(form).ajaxSubmit({
        url: '' + url,
        type: 'post',
        dataType: 'json',
        beforeSubmit: function beforeSubmit(arr, $form, options) {
          (0, _util.showElement)($('.modalLoading'));
        },
        success: function success(obj, statusText, xhr, $form) {
          (0, _util.hideElement)(divError, 500);
          (0, _util.hideElement)($('.modalLoading'), 2000);
          (0, _util.resetForm)(formTypeMember, ['_token', '_method']);
          (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
          setTimeout(function () {
            (0, _util.hideElement)(divSuccess, 3000);
            $('[data-widget=collapse2]').trigger('click');
            typeMemberDataTable.fnClearTable(true);
          }, 1000);
          (0, _util.setValue)(formTypeMember);
        },
        error: function error(context, xhr, status, errMsg) {
          (0, _util.hideElement)($('.modalLoading'), 800);
          if (context.status === 422) {
            var errors = context && context.responseText || {};
            errors = JSON.parse(errors);
            (0, _util.showMessage)(divError, errors);
          }
          $('[data-widget=collapse2]').trigger('click');
        }
      });
    }
  });

  $(document).on('click', '.typeMemberEdit', function (ev) {
    var id = $(this).data('id');
    if (!id) {
      return false;
    }
    $.ajax({
      url: path + '/' + id + '/edit',
      type: 'GET',
      dataType: 'json'
    }).done(function (obj) {
      var data = obj.data;
      (0, _util.setValue)(formTypeMember, 'PUT');
      (0, _util.setValue)(formTypeMember, data.id, 'type_member_id');
      $.each(obj.data, function (i, val) {
        $('#formTypeMember *[name=' + i + ']').val(val);
      });
      var box = $('#boxForm');
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset']);
      }
    }).fail(function (obj) {
      console.log('error', obj);
    });
  });

  $(document).on('click', '.typeMemberDelete', function (ev) {
    ev.preventDefault();
    var button = $(this);
    var form = $(this).parent();
    var method = form.find('input[name="_method"]').val();
    var token = form.find('input[name="_token"]').val();
    var url = form.attr('action');
    var data = {
      _method: method,
      _token: token
    };
    (0, _util.showElement)($('.modalLoading'));
    (0, _util.changeStatusButton)($(this));
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data
    }).done(function (obj) {
      (0, _util.changeStatusButton)(button, false);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
      setTimeout(function () {
        (0, _util.hideElement)(divSuccess, 3000);
        typeMemberDataTable.fnClearTable(true);
      }, 1000);
    }).fail(function (error) {
      var description = (0, _util.generateMessageLog)(error);
      var data = {
        type_log_id: 1,
        module: 'Type Member (Function Delete)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.changeStatusButton)(button, false);
      setTimeout(function () {
        (0, _util.hideElement)(divError, 3000);
      }, 1000);
    });
  });
});

},{"../api/":3,"../util/":16}],14:[function(require,module,exports){
'use strict';

var _util = require('../util/');

var _api = require('../api/');

/*
Module Dependencies
 */

var $ = window.jQuery;
var path = window.location.href;

$(function () {
  var tDatatable = $('#uniform_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: path + '/getpager',
    columns: [{ data: 'name', name: 'name' }, { data: 'description', name: 'description' }, { data: 'owner', name: 'owner' }, { data: 'updater', name: 'updater' }, { data: 'created_at', name: 'created_at' }, { data: 'updated_at', name: 'updated_at' }, { data: 'action', name: 'action', orderable: false, searchable: false }]
  });
  var formUniform = $('#formUniform');
  var divSuccess = $('#form-message-success');
  var divError = $('#form-message-error');
  formUniform.validate({
    rules: {
      name: { required: true },
      jersey_color_id: { required: true },
      socks_color_id: { required: true },
      short_color_id: { required: true }
    },
    highlight: function highlight(element) {
      // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
    },
    unhighlight: function unhighlight(element) {
      // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
    },
    submitHandler: function submitHandler(form) {
      var method = formUniform.find('input[name="_method"]').val();
      var url = path;
      if (method === 'PUT') {
        var uniformId = formUniform.find('input[name="uniform_id"]').val();
        url = path + '/' + uniformId;
      }
      $(form).ajaxSubmit({
        url: '' + url,
        type: 'post',
        dataType: 'json',
        beforeSubmit: function beforeSubmit(arr, $form, options) {
          (0, _util.showElement)($('.modalLoading'));
        },
        success: function success(obj, statusText, xhr, $form) {
          (0, _util.hideElement)(divError, 500);
          (0, _util.hideElement)($('.modalLoading'), 2000);
          (0, _util.resetForm)(formUniform, ['_token', '_method']);
          (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
          (0, _util.setValue)('', '', $('#short_color_id'), 'select');
          (0, _util.setValue)('', '', $('#jersey_color_id'), 'select');
          (0, _util.setValue)('', '', $('#socks_color_id'), 'select');
          setTimeout(function () {
            (0, _util.hideElement)(divSuccess, 3000);
            $('[data-widget=collapse2]').trigger('click');
            tDatatable.fnClearTable(true);
          }, 1000);
          (0, _util.setValue)(formUniform);
        },
        error: function error(context, xhr, status, errMsg) {
          (0, _util.hideElement)($('.modalLoading'), 800);
          if (context.status === 422) {
            var errors = context && context.responseText || {};
            errors = JSON.parse(errors);
            (0, _util.showMessage)(divError, errors);
          }
        }
      });
    }
  });

  $(document).on('click', '.uniformDelete', function (ev) {
    ev.preventDefault();
    var button = $(this);
    var form = $(this).parent();
    var method = form.find('input[name="_method"]').val();
    var token = form.find('input[name="_token"]').val();
    var url = form.attr('action');
    var data = {
      _method: method,
      _token: token
    };
    (0, _util.showElement)($('.modalLoading'));
    (0, _util.changeStatusButton)($(this));
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data
    }).done(function (obj) {
      (0, _util.changeStatusButton)(button, false);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
      setTimeout(function () {
        (0, _util.hideElement)(divSuccess, 3000);
        tDatatable.fnClearTable(true);
      }, 1000);
    }).fail(function (error) {
      var description = (0, _util.generateMessageLog)(error);
      var data = {
        type_log_id: 1,
        module: 'Groups (Function Delete)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.changeStatusButton)(button, false);
      setTimeout(function () {
        (0, _util.hideElement)(divError, 3000);
      }, 1000);
    });
  });

  $(document).on('click', '.uniformEdit', function (ev) {
    var id = $(this).data('id');
    if (!id) {
      return false;
    }
    $.ajax({
      url: path + '/' + id + '/edit',
      type: 'GET',
      dataType: 'json'
    }).done(function (obj) {
      var data = obj.data;
      (0, _util.setValue)(formUniform, 'PUT');
      (0, _util.setValue)(formUniform, data.id, 'uniform_id');
      $.each(obj.data, function (i, val) {
        $('#formUniform *[name=' + i + ']').val(val);
      });
      (0, _util.setValue)('', data.short_color_id, $('#short_color_id'), 'select');
      (0, _util.setValue)('', data.jersey_color_id, $('#jersey_color_id'), 'select');
      (0, _util.setValue)('', data.socks_color_id, $('#socks_color_id'), 'select');
      var box = $('#boxForm');
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset']);
      }
    }).fail(function (obj) {
      console.log('error', obj);
    });
  });
});

},{"../api/":3,"../util/":16}],15:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                              Module Dependencies
                                                                                                                                                                                                                                                                               */


require('jquery-password-generator-plugin/dist/jquery.jquery-password-generator-plugin');

var _util = require('../util/');

var _api = require('../api/');

var _userUtil = require('../util/userUtil');

var $ = window.jQuery;
var path = window.location.href;

$(function () {
  var tDatatable = $('#user_table').dataTable({
    processing: true,
    serverSide: true,
    ajax: path + '/getpager',
    columns: [{ data: 'name', name: 'name' }, { data: 'email', name: 'email' }, { data: 'type_member_name', name: 'type_member_name' }, { data: 'phone', name: 'phone' }, { data: 'activated', name: 'activated' }, { data: 'status', name: 'status' }, { data: 'owner', name: 'owner' }, { data: 'updater', name: 'updater' }, { data: 'created_at', name: 'created_at' }, { data: 'updated_at', name: 'updated_at' }, { data: 'action', name: 'action', orderable: false, searchable: false }]
  });
  var formUser = $('#formUser');
  var divSuccess = $('#form-message-success');
  var divError = $('#form-message-error');
  var copyPassword = $('.copyPassword');
  var selectCountry = $('#country_id');
  var selectState = $('#state_id');
  var selectCity = $('#city_id');
  formUser.validate({
    ignore: ['.ignore'],
    rules: {
      first_name: { required: true },
      last_name: { required: true },
      email: { required: true, email: true },
      password: { required: true, pwdsegurity: true },
      confirm_password: { required: true, equalTo: '#password' },
      type_member: { required: true }
    },
    highlight: function highlight(element) {
      // hightlight error inputs
      $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
    },
    unhighlight: function unhighlight(element) {
      // revert the change done by hightlight
      $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
    },
    submitHandler: function submitHandler(form) {
      var method = formUser.find('input[name="_method"]').val();
      var url = path;
      if (method === 'PUT') {
        var userId = formUser.find('input[name="user_id"]').val();
        url = path + '/' + userId;
      }
      $(form).ajaxSubmit({
        url: '' + url,
        type: 'post',
        dataType: 'json',
        beforeSubmit: function beforeSubmit(arr, $form, options) {
          (0, _util.showElement)($('.modalLoading'));
        },
        success: function success(obj, statusText, xhr, $form) {
          (0, _util.hideElement)(divError, 500);
          (0, _util.hideElement)($('.modalLoading'), 2000);
          (0, _util.hideElement)(copyPassword, 1000);
          (0, _util.resetForm)(formUser, ['_token', '_method']);
          (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
          setTimeout(function () {
            (0, _util.hideElement)(divSuccess, 3000);
            $('[data-widget=collapse2]').trigger('click');
            tDatatable.fnClearTable(true);
          }, 1000);
          (0, _util.setValue)(formUser);
          (0, _util.showElement)($('#generatePassword'), 1000);
        },
        error: function error(context, xhr, status, errMsg) {
          (0, _util.hideElement)($('.modalLoading'), 800);
          if (context.status === 422) {
            var errors = context && context.responseText || {};
            errors = JSON.parse(errors);
            (0, _util.showMessage)(divError, errors);
            return;
          }
          var description = (0, _util.generateMessageLog)(context);
          var data = {
            type_log_id: 1,
            module: 'users (Function ' + method + ')',
            description: JSON.stringify(description)
          };
          (0, _api.saveLog)(divError, data);
        }
      });
    }
  });

  $(document).on('click', '.userDelete', function (ev) {
    ev.preventDefault();
    var button = $(this);
    var form = $(this).parent();
    var method = form.find('input[name="_method"]').val();
    var token = form.find('input[name="_token"]').val();
    var url = form.attr('action');
    var data = {
      _method: method,
      _token: token
    };
    (0, _util.showElement)($('.modalLoading'));
    (0, _util.changeStatusButton)($(this));
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: data
    }).done(function (obj) {
      (0, _util.changeStatusButton)(button, false);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.showMessage)(divSuccess, obj.message ? obj.message : '', false);
      setTimeout(function () {
        (0, _util.hideElement)(divSuccess, 3000);
        tDatatable.fnClearTable(true);
      }, 1000);
    }).fail(function (error) {
      var description = (0, _util.generateMessageLog)(error);
      var data = {
        type_log_id: 1,
        module: 'Users (Function Delete)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
      (0, _util.hideElement)($('.modalLoading'), 2000);
      (0, _util.changeStatusButton)(button, false);
      setTimeout(function () {
        (0, _util.hideElement)(divError, 3000);
      }, 1000);
    });
  });

  $(document).on('click', '.userEdit', function (ev) {
    var id = $(this).data('id');
    if (!id) {
      return false;
    }
    $.ajax({
      url: path + '/' + id + '/edit',
      type: 'GET',
      dataType: 'json'
    }).done(function (obj) {
      var data = obj.data;
      (0, _util.setValue)(formUser, 'PUT');
      (0, _util.setValue)(formUser, data.id, 'user_id');
      $.each(obj.data, function (i, val) {
        $('#formUser *[name=' + i + ']').val(val);
      });
      (0, _util.setValue)('', data.type_member_id, $('#type_member_id'), 'select');
      if (data.category_id && _typeof(data.category_id) !== undefined) {
        (0, _util.setValue)('', data.category_id, $('#category_id'), 'select');
      }
      if (data.position_id && _typeof(data.position_id) !== undefined) {
        (0, _util.setValue)('', data.position_id, $('#position_id'), 'select');
      }
      if (data.country_id) {
        (0, _util.setValue)('', data.country_id, $('#country_id'), 'select', { stateId: data.state_id, cityId: data.city_id });
      }
      var box = $('#boxForm');
      if (box.hasClass('collapsed-box')) {
        $('[data-widget=collapse2]').trigger('click', ['reset']);
      }
      (0, _userUtil.removeDivPassword)($('.div_password'));
      (0, _userUtil.removeDivPassword)($('.div_confirm_password'));
      (0, _util.hideElement)($('#generatePassword'), 1000);
    }).fail(function (obj) {
      var description = (0, _util.generateMessageLog)(obj);
      var data = {
        type_log_id: 1,
        module: 'users (Function Edit)',
        description: JSON.stringify(description)
      };
      (0, _api.saveLog)(divError, data);
    });
  });

  $(document).on('keydown', '#password', function () {
    if ($(this).val()) {
      (0, _util.showElement)($('.open_password'), 1000);
    } else {
      (0, _util.hideElement)($('.open_password', 1000));
    }
  });
  $('#confirm_password').on('keydown', function () {
    if ($(this).val()) {
      (0, _util.showElement)($('.open_confirm'), 1000);
    } else {
      (0, _util.hideElement)($('.open_confirm', 1000));
    }
  });
  $(document).on('mousedown', '.open_password', function () {
    $('#password').attr('type', 'text');
  }).mouseup(function () {
    $('#password').attr('type', 'password');
  }).mouseout(function () {
    $('#password').attr('type', 'password');
  });
  $(document).on('mousedown', '.open_confirm', function () {
    $('#confirm_password').attr('type', 'text');
  }).mouseup(function () {
    $('#confirm_password').attr('type', 'password');
  }).mouseout(function () {
    $('#confirm_password').attr('type', 'password');
  });

  $(document).on('click', '#generatePassword', function (ev) {
    var randomPassword = $.passGen({ 'length': 30, 'numeric': true, 'lowercase': true, 'uppercase': true, 'special': true });
    $('#password, #confirm_password').val(randomPassword);
    copyPassword.html('<strong>Password:</strong> ' + randomPassword).show();
    console.log(randomPassword);
  });

  (0, _api.getCountry)(function (obj) {
    var countries = obj && obj.data || {};
    var options = '';
    $.each(countries, function (index, val) {
      options += '<option value=' + val.id + '>' + val.name + '</option>';
    });
    selectCountry.append(options);
  });

  $(document).on('change', '#country_id', function (ev, params) {
    var countryId = $(this).val();
    selectState.empty().append('<option value="">[Select Option]</option>').trigger('change');
    if (countryId && (typeof $countryId === 'undefined' ? 'undefined' : _typeof($countryId)) !== undefined) {
      (function () {
        var stateId = params && params.stateId || null;
        var cityId = params && params.cityId || null;
        (0, _api.getStateByCountry)(countryId, function (res) {
          var states = res && res.data || {};
          var options = '';
          $.each(states, function (index, val) {
            var selected = '';
            if (stateId && (typeof stateId === 'undefined' ? 'undefined' : _typeof(stateId)) !== undefined) {
              if (val.id === stateId) {
                selected = 'selected="true"';
              }
            }
            options += '<option value=' + val.id + ' ' + selected + '>' + val.name + '</option>';
          });
          var obj = {};
          if (cityId && (typeof cityId === 'undefined' ? 'undefined' : _typeof(cityId)) !== undefined) {
            obj = { cityId: cityId };
          }
          selectState.append(options).trigger('change', obj);
        });
      })();
    }
  });

  $(document).on('change', '#state_id', function (ev, params) {
    var stateId = $(this).val();
    selectCity.empty().append('<option value="">[Select Option]</option>').trigger('change');
    if (stateId && (typeof stateId === 'undefined' ? 'undefined' : _typeof(stateId)) !== undefined) {
      (function () {
        var cityId = params && params.cityId || null;
        (0, _api.getCityByState)(stateId, function (res) {
          var cities = res && res.data || {};
          var options = '';
          $.each(cities, function (index, val) {
            var selected = '';
            if (cityId && (typeof cityId === 'undefined' ? 'undefined' : _typeof(cityId)) !== undefined) {
              if (val.id === cityId) {
                selected = 'selected="true"';
              }
              selected = 'selected="true"';
            }
            options += '<option value=' + val.id + ' ' + selected + '>' + val.name + '</option>';
          });
          selectCity.append(options).trigger('change');
        });
      })();
    }
  });

  $(document).on('change', '#type_member_id', function () {
    var id = parseInt($(this).val());
    var divPlayer = $('#typeMemberPlayer');
    if (id && (typeof id === 'undefined' ? 'undefined' : _typeof(id)) !== undefined) {
      if (id === 6) {
        divPlayer.show();
      } else {
        divPlayer.hide();
        (0, _util.setValue)('', '', $('#category_id'), 'select');
        (0, _util.setValue)('', '', $('#position_id'), 'select');
        (0, _util.setValue)('', '', $('#jersey_number'));
      }
    } else {
      divPlayer.hide();
      (0, _util.setValue)('', '', $('#category_id'), 'select');
      (0, _util.setValue)('', '', $('#position_id'), 'select');
      (0, _util.setValue)('', '', $('#jersey_number'));
    }
  });
});

},{"../api/":3,"../util/":16,"../util/userUtil":17,"jquery-password-generator-plugin/dist/jquery.jquery-password-generator-plugin":1}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.showMessage = showMessage;
exports.showElement = showElement;
exports.hideElement = hideElement;
exports.resetForm = resetForm;
exports.changeStatusButton = changeStatusButton;
exports.inArray = inArray;
exports.objectLength = objectLength;
exports.generateMessageLog = generateMessageLog;
exports.setValue = setValue;
var $ = window.jQuery;

function showMessage(element, data) {
  var isArray = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var options = '';
  if (isArray) {
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        data[k].forEach(function (error) {
          options += '<p>' + error + '</p>';
        });
      }
    }
  } else {
    options = data;
  }
  $(element).html('').append(options);
  showElement($(element));
}

function showElement(element) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  $(element).show(time);
}

function hideElement(element) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  $(element).hide(time);
}

function resetForm(form, ignore) {
  var element = form[0].elements;
  if (element.length > 0) {
    for (var i = 0; i < element.length; i++) {
      if (!inArray(element[i].name, ignore)) {
        element[i].value = '';
        if (element[i].getAttribute('type') === 'checkbox') {
          element[i].checked = false;
        }
        if (element[i].tagName === 'SELECT') {
          $(element[i]).trigger('change');
        }
      }
    }
  }
}

function changeStatusButton(element) {
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (status) {
    $(element).attr('disabled', 'true');
  } else {
    $(element).removeAttr('disabled');
  }
}

function inArray(needle, haystack, argStrict) {
  //  discuss at: http://locutus.io/php/in_array/
  var key = '';
  var strict = !!argStrict;
  if (strict) {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true;
      }
    }
  } else {
    for (key in haystack) {
      if (haystack[key] === needle) {
        return true;
      }
    }
  }
  return false;
}
function objectLength(obj) {
  return Object.keys(obj).length;
}

function generateMessageLog(error) {
  if (objectLength(error) < 1) {
    return {};
  }
  var responseText = error && error.responseText || null;
  var codeStatus = error && error.status;
  var status = error && error.statusText;
  var data = {
    responseText: responseText,
    codeStatus: codeStatus,
    status: status
  };
  return data;
}

function setValue(form) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'POST';
  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '_method';
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'input';
  var object = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  if (type === 'input') {
    if (form && (typeof form === 'undefined' ? 'undefined' : _typeof(form)) !== undefined) {
      form.find('input[name="' + element + '"]').val(value);
      return;
    }
    $(element).val(value);
  } else if (type === 'select') {
    $(element).val(value).trigger('change', object);
  }
}

if (!Object.keys) {
  Object.keys = function () {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
    var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
    var dontEnumsLength = dontEnums.length;
    return function (obj) {
      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [];
      var prop = void 0;
      var i = void 0;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }();
}

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeDivPassword = removeDivPassword;
exports.createDivPassword = createDivPassword;

var _ucwords = require('locutus/php/strings/ucwords');

var _ucwords2 = _interopRequireDefault(_ucwords);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = window.jQuery; /**
                        * Module Dependencies
                        */

function removeDivPassword(element) {
  $(element).find('div').remove();
  $(element).find('label').remove();
}

function createDivPassword() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'password';

  var type = element === 'password' ? element : 'confirm_password';
  var label = (0, _ucwords2.default)(type.replace('_', ' '));
  var Html = '<label for="' + type + '"><strong class="text-red">*</strong>' + label + ':</label>\n            <div class="password">\n                <input type="password" name="' + type + '" id="' + type + '" class="form-control" required="true" maxlength="50" minlength="6">   \n                <span class="glyphicon glyphicon-eye-open open_' + type + '"></span>\n            </div>';
  return Html;
}

},{"locutus/php/strings/ucwords":2}],18:[function(require,module,exports){
'use strict';

var $ = window.jQuery;

// validador para la contraseña segura
$.validator.addMethod('pwdsegurity', function (value, element) {
  var val = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!val.test(value)) {
    return false;
  }
  return true;
}, 'Passwords must contain at least one number, one lowercase and one uppercase letter.  Please try again');

},{}]},{},[4]);
