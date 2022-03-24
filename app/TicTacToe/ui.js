const store = require('../store.js')

const onSignUpSuccess = function () {
  console.log('Successfully created account!')
}

const onSignUpFailure = function () {
  console.log("Failed, probably because I keep reusing the same emails and can't do that")
}

const onSignInSuccess = function (data) {
  console.log('Successfully logged in!')
  store.user = data.user
}

const onSignInFailure = function () {
  console.log(
    'Failed to log in'
  )
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure
}
