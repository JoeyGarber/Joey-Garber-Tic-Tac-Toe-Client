const getFormFields = require('../../lib/get-form-fields.js')

const api = require('./api.js')
const ui = require('./ui.js')
const gameApi = require('../game/gameApi.js')
const gameUi = require('../game/gameUi.js')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  delete data.credentials.password_confirmation
  api
    .signUp(getFormFields(event.target))
    .then(ui.onSignUpSuccess)
    .then(() => api.signIn(data))
    .then(ui.onSignInSuccess)
    .then(gameApi.newGame)
    .then(gameUi.onNewGameSuccess)
    .catch(ui.onSignUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  api.signIn(getFormFields(event.target))
    .then(ui.onSignInSuccess)
    .then(gameApi.newGame)
    .then(gameUi.onNewGameSuccess)
    .catch(gameUi.onNewGameFailure)
    .catch(ui.onSignInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  api.changePassword((getFormFields(event.target)))
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword
}
