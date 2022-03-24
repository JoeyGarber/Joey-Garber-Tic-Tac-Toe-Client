const store = require('../store.js')

const newGame = function () {
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com' + '/games',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Bearer ' + store.user.token
    },
    data: {}
  })
}

const squareClick = function (data) {
  return $.ajax({
    url: 'https://tic-tac-toe-api-development.herokuapp.com' + '/games/' + store.game._id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Bearer ' + store.user.token
    },
    data
  })
}

module.exports = {
  newGame,
  squareClick
}
