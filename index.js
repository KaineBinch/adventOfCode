const fs = require("fs")
const { STATUS_CODES } = require("http")

const solutionsDir = "./solutions"

const files = fs.readdirSync(solutionsDir)

for (const file of files) {
  const { solution } = require(`${solutionsDir}/${file}`)
  const dayNumber = file.slice(3, -3)
  const input = fs.readFileSync(`./puzzleInput/day${dayNumber}.txt`, "utf-8").split("\r\n")
  const start = Date.now()
  const result = solution(input)
  const elapsed = Date.now() - start

  console.log(`Day ${dayNumber}`)
  console.table(result)
  console.log(`Time Taken: ${elapsed}ms`)
}
