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
  const boardHtml = `<div id="game-board" class="container">
      <div class="row">
        <div id="square-0" data-cell-index="0" class="col-4 box">0</div>
        <div id="square-1" data-cell-index="1" class="col-4 box">1</div>
        <div id="square-2" data-cell-index="2" class="col-4 box">2</div>
        <div id="square-3" data-cell-index="3" class="col-4 box">3</div>
        <div id="square-4" data-cell-index="4" class="col-4 box">4</div>
        <div id="square-5" data-cell-index="5" class="col-4 box">5</div>
        <div id="square-6" data-cell-index="6" class="col-4 box">6</div>
        <div id="square-7" data-cell-index="7" class="col-4 box">7</div>
        <div id="square-8" data-cell-index="8" class="col-4 box">8</div>
      </div>
    </div>`
  $('#game-board').html(boardHtml)
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
    $('#game-board').html('<h1>X: YOU WON!</h1>')
  } else if (winCheck(data.game.cells, 'y') === true) {
    console.log('Y won!')
    $('#game-board').html('<h1>Y: YOU WON!</h1>')
  } else if (data.game.cells.every(cell => cell === 'x' || cell === 'y')) {
    $('#game-board').html('<h1>TIE!</h1>')
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
