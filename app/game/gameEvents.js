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

  // This keeps track of whose turn it is

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
    gameApi.updateGame(updateObject)
      .then(gameUi.onUpdateGameSuccess)
      .catch(gameUi.onUpdateGameFailure)
  } else {
    gameUi.onClickedFilledCell()
  }

  // This updates the game board
  gameUi.updateBoard(index, store.turn)

  // Down here write something that runs checkGame again, then compares it to all possible winning hands. Which I can define in a global const at the top.
  // If it matches, execute a function that tells them they won!
  // Also figure out how to switch between x and y tmm.

  // This switches whose turn it is
  alternateTurn(store.turn)
}

module.exports = {
  onNewGame,
  onSquareClick,
  alternateTurn
}
