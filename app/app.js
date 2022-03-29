// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const events = require('./auth/events.js')
const gameEvents = require('./game/gameEvents.js')
const ui = require('./auth/ui.js')

$(() => {
  // Auth event listeners
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
  $('#sign-out-button').on('click', events.onSignOut)
  $('#show-change-password-form-button').on('click', ui.onShowChangePasswordFormButton)
  $('#game-board').on('submit', '#change-password', events.onChangePassword)

  // Game event listeners
  $('#new-game-button').on('click', gameEvents.onNewGame)
  $('#show-games-button').on('click', gameEvents.onShowGames)
  $('#game-board').on('click', '#play-again-button', gameEvents.onNewGame)

  // Event listener for clicking squares
  $('#game-board').on('click', '#square-0', gameEvents.onSquareClick)
  $('#game-board').on('click', '#square-1', gameEvents.onSquareClick)
  $('#game-board').on('click', '#square-2', gameEvents.onSquareClick)
  $('#game-board').on('click', '#square-3', gameEvents.onSquareClick)
  $('#game-board').on('click', '#square-4', gameEvents.onSquareClick)
  $('#game-board').on('click', '#square-5', gameEvents.onSquareClick)
  $('#game-board').on('click', '#square-6', gameEvents.onSquareClick)
  $('#game-board').on('click', '#square-7', gameEvents.onSquareClick)
  $('#game-board').on('click', '#square-8', gameEvents.onSquareClick)
})
