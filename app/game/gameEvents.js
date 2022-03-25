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

const winCheck = function (cells, turn) {
  const winningIndexes = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [6, 7, 8]
  ]
  // These are the indexes of all of a certain player's moves
  const indexes = []
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === turn) {
      indexes.push(i)
    }
  }

  // This loops through the winning indexes, and checks if the player index contains all of any of them
  for (let i = 0; i < winningIndexes.length; i++) {
    const winningHand = winningIndexes[i].every(index => {
      return indexes.includes(index)
    })
    if (winningHand === true) {
      return winningHand
    }
  }
}

const onSquareClick = function (event) {
  event.preventDefault()
  // This is the index of the box that was clicked
  const index = $(event.target).data('cell-index')

  // This queries the server for the game being played, and puts the current cells array into store.game.cells
  gameApi.checkGame()
    .then(gameUi.onCheckGameSuccess)
    .catch(gameUi.onCheckGameFailure)

  // I don't love putting all of this here and relying on the store, becasue if you click a filled cell really fast after it's filled you might be able to do it before gameApi.checkGame() has responded and set store.game.cells. But I tried refactoring everything and it got messy and didn't work well. So oh well.
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
  alternateTurn,
  winCheck
}
