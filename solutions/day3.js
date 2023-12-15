const directions = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
];

const isNumber = (char) => !isNaN(Number(char))

const isStar = (char) => char === '*'

const getFullNumber = (rows, i, j) => {
  let currentJ = j - 1

  while (currentJ >= 0 && isNumber(rows[i][currentJ])) {
    currentJ--
  }
  const start = currentJ + 1
  currentJ = j + 1

  while (currentJ <= rows[i].length && isNumber(rows[i][currentJ])) {
    currentJ++
  }
  const end = currentJ - 1
  const fullNumber = parseInt(rows[i].slice(start, end + 1))

  return [fullNumber, `${i},${start}`]
}

const solvePartOne = (input) => {
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const char = input[i][j]
      if (char !== '.' && !isNumber(char)) {
        const dupe = {}

        for (const [dy, dx] of directions) {
          const newRow = i + dy;
          const newCol = j + dx;

          if (
            newRow >= 0 &&
            newRow < input.length &&
            newCol >= 0 &&
            newCol < input[i].length &&
            isNumber(input[newRow][newCol])
          ) {
            const [number, id] = getFullNumber(input, newRow, newCol)
            if (dupe[id] != undefined) continue
            dupe[id] = true
            sum += number
          }
        }
      }
    }
  }
  return sum
}

const solvePartTwo = (input) => {
  let total = 0
  const dupe = {}

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const char = input[i][j]

      if (isStar(char)) {
        const numbers = []

        for (const [dy, dx] of directions) {
          const newRow = i + dy;
          const newCol = j + dx;

          if (
            newRow >= 0 &&
            newRow < input.length &&
            newCol >= 0 &&
            newCol < input[i].length &&
            isNumber(input[newRow][newCol])
          ) {
            const [number, id] = getFullNumber(input, newRow, newCol)
            if (dupe[id] != undefined) continue
            dupe[id] = true
            numbers.push(number)
          }
        }
        if (numbers.length == 2) total += (numbers[0] * numbers[1])
      }
    }
  }
  return total
}

const solution = (input) => {
  const partOne = solvePartOne(input)
  const partTwo = solvePartTwo(input)

  return { partOne, partTwo }
}

module.exports = { solution }

