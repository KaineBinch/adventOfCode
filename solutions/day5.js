
const parseInput = (input) => {
  const seeds = input[0].split(": ")[1]
    .split(" ")
    .map(seedNum => parseInt(seedNum), 0);
  const maps = []
  for (let i = 1; i < input.length; i++) {
    const line = input[i]
    if (line == "") {
      maps.push([])
      continue
    }
    if (line.includes("to")) continue
    const [dest, source, length] = line.split(" ").map(num => parseInt(num))
    maps[maps.length - 1].push({ source, dest, length })
  }

  return [seeds, maps]
}

const handleMapping = (input, map) => {
  for (const { source, dest, length } of map) {
    if (source <= input && input <= source + length) {
      return dest + (input - source)
    }
  }
  return input
}

const getSeedLocation = (seed, maps) => {
  let curr = seed
  for (const map of maps) {
    curr = handleMapping(curr, map)
  }
  return curr
}

const solvePartOne = (seeds, maps) => {
  let min = Infinity
  for (const seed of seeds) {
    min = Math.min(min, getSeedLocation(seed, maps))
  }
  return min
}

const solution = (input) => {
  const [seeds, maps] = parseInput(input)
  const partOne = solvePartOne(seeds, maps)

  return { partOne }
}
module.exports = { solution }