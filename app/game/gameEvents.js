const gameApi = require('./gameApi.js')
const gameUi = require('./gameUi.js')
const helpers = require('./helpers.js')

let turn = 'x'
const localScore = []
const localScoreX = []
const localScoreY = []

const alternateTurn = function () {
  if (turn === 'x') {
    turn = 'y'
  } else {
    turn = 'x'
  }
}

const onNewGame = function (event) {
  event.preventDefault()
  gameApi.newGame()
    .then(gameUi.onNewGameSuccess)
    .catch(gameUi.onNewGameFailure)
}

const onShowGames = function (event) {
  event.preventDefault()
  gameApi.showGames()
    .then(gameUi.onShowGamesSuccess)
    .catch(gameUi.onShowGamesFailure)
}

const onSquareClick = function (event) {
  event.preventDefault()
  // Index of the box that was clicked
  const index = $(event.target).data('cell-index')

  // Checks if the space is open to be played on
  if (!localScore.includes(index)) {
    // Updates the local scores on a valid move
    localScore.push(index)
    if (turn === 'x') {
      localScoreX.push(index)
    } else {
      localScoreY.push(index)
    }

    // Checks if the game is over
    const gameOver = helpers.winCheck(localScoreX, 'x') || helpers.winCheck(localScoreY, 'y') || localScore.length === 9

    // Data object that needs to be sent to the server to update the game
    const updateObject = {
      game: {
        cell: {
          index: index,
          value: turn
        },
        over: gameOver
      }
    }

    // Sends the update object to the server
    gameApi.updateGame(updateObject)
      .then(gameUi.onUpdateGameSuccess)
      .catch(gameUi.onUpdateGameFailure)

    // Updates the game board
    gameUi.onUpdateBoardRequest(index, turn)

    // Switches whose turn it is
    alternateTurn()

    // Resets things when someone wins or they tie
    if (gameOver === true) {
      localScoreX.length = 0
      localScoreY.length = 0
      localScore.length = 0
      turn = 'x'
    }
  } else {
    helpers.onClickedFilledCell()
  }
}

module.exports = {
  onNewGame,
  onShowGames,
  onSquareClick,
  alternateTurn
}
