const parseGames = (input) => {
  const games = []
  for (const line of input) {
    const game = []
    const roundsString = line.split(": ")[1]
    const roundStrings = roundsString.split("; ")
    for (const roundString of roundStrings) {
      const round = { red: 0, green: 0, blue: 0 }
      const colourStrings = roundString.split(", ")
      for (const colourString of colourStrings) {
        const [numString, colourName] = colourString.split(" ")
        const colourCount = parseInt(numString)
        round[colourName] = colourCount
      }
      game.push(round)
    }
    games.push(game)
  }
  return games
}

const maxCubes = { red: 12, green: 13, blue: 14 }

const isRoundValid = (round) => {
  if (round.red > maxCubes.red) return false
  if (round.green > maxCubes.green) return false
  if (round.blue > maxCubes.blue) return false
  return true
}

const isGameValid = (game) => {
  for (const round of game) {
    if (!isRoundValid(round)) {
      return false
    }
  }
  return true
}

const solvePartOne = (games) => {
  let total = 0

  for (let i = 0; i < games.length; i++) {
    if (!isGameValid(games[i])) continue
    total += (i + 1)
  }
  return total
}

const solvePartTwo = (games) => {
  let total = 0

  for (const game of games) {
    const minCubes = { red: 0, green: 0, blue: 0 }
    for (const round of game) {
      if (round.red > minCubes.red) minCubes.red = round.red
      if (round.green > minCubes.green) minCubes.green = round.green
      if (round.blue > minCubes.blue) minCubes.blue = round.blue
    }
    const power = (minCubes.red * minCubes.green * minCubes.blue)
    total += power
  }
  return total
}

const solution = (input) => {
  const games = parseGames(input)
  const partOne = solvePartOne(games)
  const partTwo = solvePartTwo(games)

  return { partOne, partTwo }
}

module.exports = { solution }