const store = require('../store.js')
const helpers = require('./helpers.js')

const onNewGameSuccess = function (data) {
  store.game = data.game
  $('form').trigger('reset')
  const boardHtml = `<div id="game-board" class="container">
      <div class="row">
        <div id="square-0" data-cell-index="0" class="col-4 square"></div>
        <div id="square-1" data-cell-index="1" class="col-4 square"></div>
        <div id="square-2" data-cell-index="2" class="col-4 square"></div>
        <div id="square-3" data-cell-index="3" class="col-4 square"></div>
        <div id="square-4" data-cell-index="4" class="col-4 square"></div>
        <div id="square-5" data-cell-index="5" class="col-4 square"></div>
        <div id="square-6" data-cell-index="6" class="col-4 square"></div>
        <div id="square-7" data-cell-index="7" class="col-4 square"></div>
        <div id="square-8" data-cell-index="8" class="col-4 square"></div>
      </div>
    </div>`
  $('#game-board').html(boardHtml)
}

const onNewGameFailure = function () {
  $('#message').show()
  $('#message').html(
    '<p>Whups, that didn\'t work</p>')
}

const onShowGamesSuccess = function (data) {
  let gamesString = ''
  for (let i = 0; i < data.games.length; i++) {
    gamesString += '<p>Game ' + (i + 1) + ':<ul style="list-style-type: none;"><li>' + helpers.selectThreeIndices(0, 1, 2, data.games[i].cells) + '</li><li>' + helpers.selectThreeIndices(3, 4, 5, data.games[i].cells) + '</li><li>' + helpers.selectThreeIndices(6, 7, 8, data.games[i].cells) + '</li></ul></p><p>Game over: ' + data.games[i].over + '</p>'
    $('#modal-message').html(gamesString)
  }
}

const onShowGamesFailure = function (data) {
  $('#message').show()
  $('#message').html('Something went wrong!')
}

const onUpdateGameSuccess = function (data) {
  if (data.game.over) {
    if (helpers.winCheckForUi(data.game.cells, 'x')) {
      $('#game-board').html(
        '<h1>X: YOU WON!</h1> <button type="button" class="btn btn-success" id="play-again-button">Play Again?</button>'
      )
    } else if (helpers.winCheckForUi(data.game.cells, 'y')) {
      $('#game-board').html(
        '<h1>Y: YOU WON!</h1><button type="button" class="btn btn-success" id="play-again-button">Play Again?</button>'
      )
    } else {
      $('#game-board').html(
        '<h1>TIE!</h1><button type="button" class="btn btn-success" id="play-again-button">Play Again?</button>'
      )
    }
  }
}

const onUpdateGameFailure = function (data) {
  $('#message').show()
  $('#message').html('Updating the game went wrong!')
}

const onUpdateBoardRequest = function (index, turn) {
  $('#square-' + index).text(turn)
}

const onSquareClickSuccess = function () {
  console.log('Nice, click worked')
}

const onSquareClickFailure = function () {
  console.log('Aw :( click failed')
}

module.exports = {
  onNewGameSuccess,
  onNewGameFailure,
  onShowGamesSuccess,
  onShowGamesFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onUpdateBoardRequest,
  onSquareClickSuccess,
  onSquareClickFailure
}
