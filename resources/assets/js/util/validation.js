let $ = window.jQuery

// validador para la contraseña segura
$.validator.addMethod('pwdsegurity', function (value, element) {
  var val = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
  if (!val.test(value)) {
    return false
  }
  return true
}, 'Passwords must contain at least one number, one lowercase and one uppercase letter.  Please try again')
