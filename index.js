const fs = require("fs")

const solutionsDir = "./solutions"

const files = fs.readdirSync(solutionsDir)

for (const file of files) {
  const { solution } = require(`${solutionsDir}/${file}`)
  const result = solution()
  const dayNumber = file.slice(3, -3)

  console.log(`Day ${dayNumber}`)
  console.table(result)
}
