const getGameResults = (input) => {
  const gameResults = []
  for (const line of input) {
    const game = line.split(": ")[1]
    const [winnersStr, numbersStr] = game.split(" | ")
    const numbers = numbersStr
      .split(" ")
      .filter(str => str.length > 0)
      .map(str => parseInt(str))
      .reduce((map, num) => {
        map[num] = true
        return map
      }, {})
    const winners = winnersStr
      .split(" ")
      .filter(str => str.length > 0)
      .map(str => parseInt(str))
    let count = 0
    for (const winner of winners) {
      if (numbers[winner]) count++
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
  const gameResults = getGameResults(input)
  const partOne = solvePartOne(gameResults)
  const partTwo = solvePartTwo(gameResults)

  return { partOne, partTwo }
}

module.exports = { solution }