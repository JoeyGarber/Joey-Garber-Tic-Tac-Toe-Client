const store = require('../store.js')
const apiUrl = require('../config.js')

const newGame = function () {
  return $.ajax({
    url: apiUrl.apiUrl + '/games',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Bearer ' + store.user.token
    },
    data: {}
  })
}

const showGames = function () {
  return $.ajax({
    url: apiUrl.apiUrl + '/games/',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const updateGame = function (data) {
  return $.ajax({
    url: apiUrl.apiUrl + '/games/' + store.game._id,
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
  showGames,
  updateGame
}
