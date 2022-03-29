const store = require('../store.js')

const onSignUpSuccess = function () {
  $('message').show()
  $('#message').html('<p>You created your account successfully! Nice work! Now log in!</p>')
  $('#message').hide(3000)
  $('form').trigger('reset')
}

const onSignUpFailure = function () {
  $('#message').show()
  $('#message').html('<p>Whups, sign-up didn\'t work.</p>')
}

const onSignInSuccess = function (data) {
  $('#message').show()
  $('#message').html('<p>You logged in successfully! Good stuff!</p>')
  $('#message').hide(3000)
  $('form').trigger('reset')
  $('.topnav').css('display', 'flex')
  $('form').css('display', 'none')
  store.user = data.user
}

const onSignInFailure = function () {
  $('#message').show()
  $('#message').html('<p>Oops, that didn\'t work</p>')
}

const onSignOutSuccess = function () {
  $('#message').show()
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
  $('#message').show()
  $('#message').html("<p>Oops, that didn't work</p>")
}

const onShowChangePasswordFormButton = function () {
  $('#game-board').html(`<form id="change-password">
        <input type="password" name="passwords[old]" placeholder="Old Password">
        <input type="password" name="passwords[new]" placeholder="New Password">
        <button type="submit">Change Password</button>
      </form>`)
}

const onChangePasswordSuccess = function () {
  $('#message').show()
  $('#message').html('<p>Password changed successfully! Good stuff!</p>')
  $('#message').hide(3000)
  $('form').trigger('reset')
}

const onChangePasswordFailure = function () {
  $('#message').show()
  $('#message').html('<p>Oops, something went wrong</p>')
  $('#message').hide(3000)
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onShowChangePasswordFormButton,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
