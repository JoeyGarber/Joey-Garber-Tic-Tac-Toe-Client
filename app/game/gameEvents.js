// const getFormFields = require('../../lib/get-form-fields.js')

const gameApi = require('./gameApi')
const gameUi = require('./gameUi')

const onNewGame = function (event) {
  event.preventDefault()
  gameApi.newGame()
    .then(gameUi.onNewGameSuccess)
    .catch(gameUi.onNewGameFailure)
}

const onSquareClick = function (event) {
  event.preventDefault()
  const index = $(event.target).data('cell-index')

  const updateObject = {
    game: {
      cell: {
        index: index,
        value: 'x'
      },
      over: false
    }
  }

  gameApi.squareClick(updateObject)
    .then(gameUi.onSquareClickSuccess)
    .catch(gameUi.onSquareClickFailure)
}

module.exports = {
  onNewGame,
  onSquareClick
}
