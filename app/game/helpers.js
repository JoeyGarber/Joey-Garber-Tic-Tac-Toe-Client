const onClickedFilledCell = function () {
  $('#message').html('<p>That cell is filled, try again')
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

const selectThreeIndices = function (indice0, indice1, indice2, array) {
  return [indice0, indice1, indice2].map(play => array[play])
}

module.exports = {
  winCheck,
  winCheckForUi,
  onClickedFilledCell,
  selectThreeIndices
}
