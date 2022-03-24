// const store = require('../store.js')

const store = require('../store')

const onNewGameSuccess = function (data) {
  $('.box').css('display', 'flex')
  store.game = data.game
  console.log(store.game)
  $('form').trigger('reset')
}

const onNewGameFailure = function () {
  $('#message').html(
    "<p>Whups, that new game didn't work. Are you signed in?</p>")
}

module.exports = {
  onNewGameSuccess,
  onNewGameFailure
}
