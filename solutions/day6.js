const parseInput = (input) => {
  const times = input[0].split(": ")[1]
    .split(" ")
    .filter(x => x.length > 0)
    .map(x => parseInt(x))

  const records = input[1].split(": ")[1]
    .split(" ")
    .filter(x => x.length > 0)
    .map(x => parseInt(x))

  return { times, records }
}

const dontSimulateRaces = (time, record) => {
  const maxHoldTime = Math.floor(time / 2)
  const recordHoldTime = Math.floor((Math.sqrt(Math.pow(time, 2) - (4 * record)) - time) / -2)
  const graphDistance = (maxHoldTime - recordHoldTime)

  return time % 2 == 0 ? (graphDistance * 2) - 1 : (graphDistance * 2)
}

const solvePartOne = (times, records) => {
  let result = 1
  for (let i = 0; i < times.length; i++) {
    const time = times[i]
    const record = records[i]

    result *= dontSimulateRaces(time, record)
  }
  return result
}

const solvePartTwo = (times, records) => {
  const time = parseInt(times.join(""))
  const record = parseInt(records.join(""))

  return dontSimulateRaces(time, record)
}

const solution = (input) => {
  const { times, records } = parseInput(input)
  const partOne = solvePartOne(times, records)
  const partTwo = solvePartTwo(times, records)
  return { partOne, partTwo }
}

module.exports = { solution }