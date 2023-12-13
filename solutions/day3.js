const isNumber = (char) => !isNaN(Number(char))

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

const solvePartOne = (rows) => {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  let sum = 0;

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      const char = rows[i][j]
      if (char !== '.' && !isNumber(char)) {
        const dupe = {}

        for (const [dy, dx] of directions) {
          const newRow = i + dy;
          const newCol = j + dx;

          if (
            newRow >= 0 &&
            newRow < rows.length &&
            newCol >= 0 &&
            newCol < rows[i].length &&
            isNumber(rows[newRow][newCol])
          ) {
            const [number, id] = getFullNumber(rows, newRow, newCol)
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


const solution = (input) => {
  const partOne = solvePartOne(input)

  return { partOne }
}

module.exports = { solution }