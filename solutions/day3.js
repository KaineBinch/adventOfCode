const solvePartOne = (input) => {
  const rows = input.trim().split('\n').map(row => row.trim().split(''));
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  let sum = 0;

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] !== '.') {
        let adjacentToSymbol = false;

        for (const [dx, dy] of directions) {
          const newRow = i + dx;
          const newCol = j + dy;

          if (
            newRow >= 0 &&
            newRow < rows.length &&
            newCol >= 0 &&
            newCol < rows[i].length &&
            rows[newRow][newCol] !== '.'
          ) {
            adjacentToSymbol = true;
            break;
          }
        }

        if (adjacentToSymbol) {
          sum += parseInt(rows[i][j]);
        }
      }
    }
  }

  return sum;
}

const totalSum = solvePartOne(input);

const solution = (input) => {
  const partOne = solvePartOne(input)

  return { partOne }
}

module.exports = { solution }