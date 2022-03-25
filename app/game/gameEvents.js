const gameApi = require('./gameApi')
const gameUi = require('./gameUi')

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

// winCheck takes the local score array of indexes for a player and that player's X or O status, and returns true if they've won
const winCheck = function (localScore, turn) {
  const winningIndexes = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [6, 7, 8]
  ]
  // This loops through the winning indexes and checks if all these plays are in the local scores kept
  for (let i = 0; i < winningIndexes.length; i++) {
    const winningScore = winningIndexes[i].every((play) => {
      return localScore.includes(play)
    })
    if (winningScore === true) {
      return winningScore
    }
  }
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
    const gameOver = winCheck(localScoreX, 'x') || winCheck(localScoreY, 'y') || localScore.length === 9

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
    gameUi.onClickedFilledCell()
  }
}

module.exports = {
  onNewGame,
  onShowGames,
  onSquareClick,
  alternateTurn,
  winCheck
}
