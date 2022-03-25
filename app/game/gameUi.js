// const store = require('../store.js')

const store = require('../store')

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
    const winningHand = winningIndexes[i].every((index) => {
      return indexes.includes(index)
    })
    if (winningHand === true) {
      return winningHand
    }
  }
}

const onNewGameSuccess = function (data) {
  $('.box').css('display', 'flex')
  store.game = data.game
  $('form').trigger('reset')
}

const onNewGameFailure = function () {
  $('#message').html(
    "<p>Whups, that new game didn't work. Are you signed in?</p>")
}

const onCheckGameSuccess = function (data) {
  store.game.cells = data.game.cells
}

const onCheckGameFailure = function () {
  $('#message').html("<p>Couldn't check this game for some reason</p>")
}

const onUpdateGameSuccess = function (data) {
  $('#message').html(
    '<p>WORKED</p>'
  )
  if (winCheck(data.game.cells, 'x') === true) {
    console.log('X won!')
  } else if (winCheck(store.game.cells, 'y') === true) {
    console.log('Y won!')
  }
}

const onUpdateGameFailure = function (data) {
  console.log("This should be what/'s wrong")
  console.log(data)
}

const onClickedFilledCell = function () {
  $('#message').html('<p>That cell is filled, try again')
}

const onUpdateBoardRequest = function (index, turn) {
  $('#square-' + index).text(turn)
}

module.exports = {
  onNewGameSuccess,
  onNewGameFailure,
  onCheckGameSuccess,
  onCheckGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onClickedFilledCell,
  onUpdateBoardRequest,
  winCheck
}
