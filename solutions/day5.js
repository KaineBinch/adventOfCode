
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

// TODO: INFINITY? WHY? JACSON?

const solvePartOne = (seeds, maps) => {
  let min = Infinity
  for (const seed of seeds) {
    min = Math.min(min, getSeedLocation(seed, maps))
  }
  return min
}

const parseSeedRange = (seeds) => {
  const newSeeds = []
  for (let i = 0; i < seeds.length - 1; i += 2) {
    newSeeds.push({
      start: seeds[i],
      length: seeds[i + 1]
    })
  }
  return newSeeds
}

const getMaxTarget = (map) => {
  let maxTarget = -1
  for (const { dest, length } of map) {
    maxTarget = Math.max(maxTarget, dest + length)
  }
  return maxTarget
}

const findSeedRangeOffset = (seedRange, target, maxTarget) => {
  if (maxTarget >= seedRange.start && target < seedRange.start + seedRange.length) {
    return target < seedRange.start ? seedRange.start - target : 0
  }
  return -1
}

const getRangesForTargetRange = (target, maxTarget, map) => {
  const ranges = []
  const min = { source: Infinity, dest: Infinity }
  const max = { source: -1, dest: -1 }
  for (const { source, dest, length } of map) {
    if (dest < min.dest) min.dest = dest
    if (source < min.source) min.source = source
    if (dest > max.dest) max.dest = dest
    if (source > max.source) max.source = source
    ranges.push({
      sourceStart: source,
      sourceEnd: source + length - 1,
      destStart: dest,
      destEnd: dest + length - 1
    })
  }
  if (min.source - 1 > target) ranges.push({
    sourceStart: target,
    sourceEnd: min.source - 1,
    destStart: target,
    destEnd: min.source - 1
  })
  if (max.source + 1 < maxTarget) ranges.push({
    sourceStart: max.source + 1,
    sourceEnd: maxTarget,
    destStart: max.source + 1,
    destEnd: maxTarget
  })
  return ranges
}

const getMinMapInputRangesForTargetRange = (target, maxTarget, map) => {
  const resultRanges = []
  const possibleRanges = getRangesForTargetRange(target, maxTarget, map)
  for (const range of possibleRanges) {
    const { sourceStart, sourceEnd, destStart, destEnd } = range
    if (target + maxTarget >= destStart && target < destEnd) {
      let startDiff = target - destStart
      if (startDiff < 0) startDiff = 0
      let endDiff = destEnd - maxTarget
      if (endDiff < 0) endDiff = 0
      if (sourceStart + startDiff > sourceEnd - endDiff) continue
      resultRanges.push({
        sourceStart: sourceStart + startDiff,
        sourceEnd: sourceEnd - endDiff,
        destStart: destStart + startDiff
      })
    }
  }
  resultRanges.sort((a, b) => a.destStart - b.destStart)
  return resultRanges
}

const recursivelyGetLowestTarget = (seedRanges, maps, target, maxTarget, mapIndex) => {
  if (mapIndex < 0) {
    for (const seedRange of seedRanges) {
      const offset = findSeedRangeOffset(seedRange, target, maxTarget)
      if (offset != -1) {
        return target + offset
      }
    }
    return -1
  }

  const map = maps[mapIndex]
  const ranges = getMinMapInputRangesForTargetRange(target, maxTarget, map)
  for (const { sourceStart, sourceEnd, destStart } of ranges) {
    const result = recursivelyGetLowestTarget(seedRanges, maps, sourceStart, sourceEnd, mapIndex - 1)
    if (result != -1) {
      const diff = destStart - sourceStart
      return result + diff
    }
  }
  return -1
}

const solvePartTwo = (seedRanges, maps) => {
  const target = 0
  const maxTarget = getMaxTarget(maps[maps.length - 1])
  return recursivelyGetLowestTarget(seedRanges, maps, target, maxTarget, maps.length - 1)

}

const solution = (input) => {
  const [seeds, maps] = parseInput(input)
  const partOne = solvePartOne(seeds, maps)
  const seedRanges = parseSeedRange(seeds)
  const partTwo = solvePartTwo(seedRanges, maps)

  return { partOne, partTwo }
}
module.exports = { solution }