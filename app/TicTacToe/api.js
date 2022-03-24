const store = require('../store.js')

const signUp = function (data) {
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com' + '/sign-up',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com' + '/sign-in',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data
  })
}

const signOut = function () {
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com' + '/sign-out',
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  signOut
}
