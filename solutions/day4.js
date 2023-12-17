const parseGames = (input) => {
  const games = []
  for (const line of input) {
    const game = line.split(": ")[1]
    const numbers = game.split(" | ")[1]
      .split(" ")
      .filter(str => str.length > 0)
      .map(str => parseInt(str))
      .reduce((map, num) => {
        map[num] = true
        return map
      }, {})
    const winners = game.split(" | ")[0]
      .split(" ")
      .filter(str => str.length > 0)
      .map(str => parseInt(str))
    games.push({ numbers, winners })
  }
  return games
}

const getGameResults = (games) => {
  const gameResults = []
  for (const game of games) {
    let count = 0
    for (const winner of game.winners) {
      if (game.numbers[winner]) count++
    }
    gameResults.push(count)
  }
  return gameResults
}

const solvePartOne = (gameResults) => {
  let result = 0
  for (const count of gameResults) {
    if (count > 0) result += Math.pow(2, (count - 1))
  }
  return result
}

const solvePartTwo = (gameResults) => {
  const copies = gameResults.map(_ => 1)
  for (let i = 0; i < copies.length; i++) {
    const result = gameResults[i]
    for (let offset = 1; offset <= result; offset++) {
      copies[i + offset] += copies[i]
    }
  }
  return copies.reduce((total, num) => total + num)
}

const solution = (input) => {
  const games = parseGames(input)
  const gameResults = getGameResults(games)
  const partOne = solvePartOne(gameResults)
  const partTwo = solvePartTwo(gameResults)

  return { partOne, partTwo }
}

module.exports = { solution }