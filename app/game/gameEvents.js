// const getFormFields = require('../../lib/get-form-fields.js')
const store = require('../store.js')

const gameApi = require('./gameApi')
const gameUi = require('./gameUi')

store.turn = 'x'

const alternateTurn = function (turn) {
  if (turn === 'x') {
    store.turn = 'y'
  } else {
    store.turn = 'x'
  }
}

const onNewGame = function (event) {
  event.preventDefault()
  gameApi.newGame()
    .then(gameUi.onNewGameSuccess)
    .catch(gameUi.onNewGameFailure)
}

const onSquareClick = function (event) {
  event.preventDefault()
  // This is the index of the box that was clicked
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
          value: store.turn
        },
        over: false
      }
    }

    // This sends the update object to the server
    // It also updates store.game, so that cells in store.game.cells are current
    gameApi.updateGame(updateObject)
      .then(gameUi.onUpdateGameSuccess)
      .catch(gameUi.onUpdateGameFailure)

    // This updates the game board
    gameUi.onUpdateBoardRequest(index, store.turn)

    // This switches whose turn it is
    alternateTurn(store.turn)
  } else {
    gameUi.onClickedFilledCell()
  }
}

module.exports = {
  onNewGame,
  onSquareClick,
  alternateTurn
}
