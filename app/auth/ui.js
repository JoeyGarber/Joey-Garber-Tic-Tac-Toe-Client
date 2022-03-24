const store = require('../store.js')

const onSignUpSuccess = function () {
  $('#message').html('<p>You created your account successfully! Nice work! Now log in!</p>')
  $('form').trigger('reset')
}

const onSignUpFailure = function () {
  $('#message').html("<p>Whups, sign-up didn't work. Check that you aren't already registered with that email</p>")
}

const onSignInSuccess = function (data) {
  $('#message').html('<p>You logged in successfully! Good stuff!</p>')
  $('form').trigger('reset')
  store.user = data.user
}

const onSignInFailure = function () {
  console.log(
    $('#message').html('<p>Oops, that didn\'t work</p>')
  )
}

const onSignOutSuccess = function () {
  $('#message').html('<p>You logged out successfully! Good stuff!</p>')
  $('form').trigger('reset')
  store.user = null
}

const onSignOutFailure = function () {
  console.log($('#message').html("<p>Oops, that didn't work</p>"))
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure
}
