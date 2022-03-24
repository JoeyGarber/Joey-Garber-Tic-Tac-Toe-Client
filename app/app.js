// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const events = require('./auth/events.js')
const gameEvents = require('./game/gameEvents.js')

$(() => {
  // Auth event listeners
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-in-form').on('submit', events.onSignIn)
  $('#sign-out-button').on('click', events.onSignOut)

  // Game event listeners
  $('#new-game-button').on('click', gameEvents.onNewGame)

  // Event listener for clicking square 0
  $('#square-0').on('click', gameEvents.onSquareClick)
})
