// const store = require('../store.js')

const store = require('../store')

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
  store.game = data.game
}

const onUpdateGameFailure = function (data) {
  console.log("This should be what/'s wrong")
  console.log(data)
}

const onClickedFilledCell = function () {
  $('#message').html('<p>That cell is filled, try again')
}

const updateBoard = function (index, turn) {
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
  updateBoard
}
