const store = require('../store.js')

const winCheckForUi = function (array, turn) {
  const winningIndexes = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [6, 7, 8]
  ]
  const index = []
  for (let i = 0; i < array.length; i++) {
    if (array[i] === turn) {
      index.push(i)
    }
  }

  for (let i = 0; i < winningIndexes.length; i++) {
    const winningScore = winningIndexes[i].every((play) => {
      return index.includes(play)
    })
    if (winningScore === true) {
      return winningScore
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

const onShowGamesSuccess = function (data) {
  let gamesString = ''
  for (let i = 0; i < data.games.length; i++) {
    gamesString += '<p>Game: ' + data.games[i].cells + '</p><p>Game over: ' + data.games[i].over + '</p>'
    $('#message').html(gamesString)
  }
}

const onShowGamesFailure = function (data) {
  $('#message').html('Something went wrong!')
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
  if (data.game.over) {
    if (winCheckForUi(data.game.cells, 'x')) {
      $('#game-board').html('<h1>X: YOU WON!</h1>')
    } else if (winCheckForUi(data.game.cells, 'y')) {
      $('#game-board').html('<h1>Y: YOU WON!</h1>')
    } else {
      $('#game-board').html('<h1>TIE!</h1>')
    }
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
  onShowGamesSuccess,
  onShowGamesFailure,
  onCheckGameSuccess,
  onCheckGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onClickedFilledCell,
  onUpdateBoardRequest,
  winCheckForUi
}
