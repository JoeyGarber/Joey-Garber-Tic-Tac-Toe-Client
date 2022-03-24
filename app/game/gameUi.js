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

const onSquareClickSuccess = function (data) {
  $('#message').html(
    '<p>WORKED</p>'
  )
  console.log(data.game)
}

const onSquareClickFailure = function (data) {
  console.log("This should be what/'s wrong")
  console.log(data)
}

module.exports = {
  onNewGameSuccess,
  onNewGameFailure,
  onSquareClickSuccess,
  onSquareClickFailure
}
