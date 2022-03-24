// const getFormFields = require('../../lib/get-form-fields.js')
const store = require('../store.js')

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

  // This queries the server for the game being played, and puts the current cells array into store.game.cells
  gameApi.checkGame()
    .then(gameUi.onCheckGameSuccess)
    .catch(gameUi.onCheckGameFailure)

  if (store.game.cells[index] === '') {
    // This is the data object that needs to be sent to the server to update the game
    const updateObject = {
      game: {
        cell: {
          index: index,
          value: 'x'
        },
        over: false
      }
    }

    // This sends the update object to the server
    gameApi.updateGame(updateObject)
      .then(gameUi.onUpdateGameSuccess)
      .catch(gameUi.onUpdateGameFailure)
  } else {
    gameUi.onClickedFilledCell()
  }

  // This updates the gameboard
  gameUi.updateBoard(index)
}

module.exports = {
  onNewGame,
  onSquareClick
}
