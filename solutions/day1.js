// Part one solution
const solvePartOne = (input) => {
  let numbers = []
  input.forEach((line) => {
    let matches = line.match(/\d+/g);
    if (matches) {
      const buffer = matches.join("")
      numbers.push(Number(buffer[0] + buffer[buffer.length - 1]))
    }
  })
  return numbers.reduce((a, b) => a + b)
}


// Part two solution
const words = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

const checkForWord = (line, j) => {
  for (let w = 0; w < words.length; w++) {
    const word = words[w]
    if (line.length - j < word.length) continue
    if (word == line.slice(j, j + word.length)) {
      return w + 1
    }
  }
}

const solvePartTwo = (input) => {
  let values = []

  for (let i = 0; i < input.length; i++) {
    const line = input[i]
    let buffer = ""

    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      if (!isNaN(char)) {
        buffer += char
        break
      }
      const wordNumber = checkForWord(line, j)

      if (wordNumber) {
        buffer += wordNumber
        break
      }
    }
    for (let j = line.length - 1; j >= 0; j--) {
      const char = line[j]
      if (!isNaN(char)) {
        buffer += char
        break
      }
      const wordNumber = checkForWord(line, j)

      if (wordNumber) {
        buffer += wordNumber
        break
      }
    }
    values.push(Number(buffer))
  }
  return values.reduce((a, b) => a + b)
}

const solution = (input) => {
  const partOne = solvePartOne(input)
  const partTwo = solvePartTwo(input)

  return { partOne, partTwo }
}
module.exports = { solution }

