const store = require('../store.js')

const onSignUpSuccess = function () {
  $('#message').html('<p>You created your account successfully! Nice work! Now log in!</p>')
  $('#message').hide(3000)
  $('form').trigger('reset')
}

const onSignUpFailure = function () {
  $('#message').html('<p>Whups, sign-up didn\'t work.</p>')
}

const onSignInSuccess = function (data) {
  $('#message').html('<p>You logged in successfully! Good stuff!</p>')
  $('#message').hide(3000)
  $('form').trigger('reset')
  $('.topnav').css('display', 'flex')
  $('form').css('display', 'none')
  store.user = data.user
}

const onSignInFailure = function () {
  $('#message').html('<p>Oops, that didn\'t work</p>')
}

const onSignOutSuccess = function () {
  $('#message').html('<p>You logged out successfully! Good stuff!</p>')
  $('#message').hide(3000)
  $('form').trigger('reset')
  $('.topnav').css('display', 'none')
  $('form').css('display', 'flex')
  $('form').css('flex-direction', 'column')
  $('#game-board').html('<div id="game-board"></div>')
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
