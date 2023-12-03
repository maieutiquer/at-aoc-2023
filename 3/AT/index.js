const { readFileSync } = require('fs')
const dir = __dirname.split('/')
dir.pop()
let base = 1
const parse = (input) => {
  const N = input.indexOf('\n')
  const parsed = `${'.'.repeat(N)}\n${input}\n${'.'.repeat(N)}`
    .trim()
    .split('\n')
    .map((x) => {
      base = 1
      return `.${x}.`
        .trim()
        .split('')
        .reverse()
        .map((x) => {
          if (x === '.') {
            base = 1
            return '.'
          } else if (Number.isInteger(+x)) {
            const temp = x * base
            base *= 10
            return temp
          }
          base = 1
          return x
        })
        .reverse()
    })
  return parsed
}
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
  [1, -1],
  [-1, 1],
  [-1, -1],
  [1, 1],
]
const part1 = (matrix) => {
  let sum = 0
  let isValid = 0
  for (let Y = 0; Y < matrix.length; ++Y) {
    let local = 0
    for (let X = 0; X < matrix[0].length; ++X) {
      const current = matrix[Y][X]
      const isInteger = Number.isInteger(current)
      if (!isValid && current !== '.') {
        for (const [y, x] of dirs) {
          const dx = X + x
          const dy = Y + y
          if (matrix[dy] && matrix[dy][dx]) {
            const cell = matrix[dy][dx]
            if (!Number.isInteger(cell) && cell !== '.') {
              isValid = 1
            }
          }
        }
      }
      if (isInteger) {
        local += current
      } else {
        if (isValid) sum += local
        local = 0
        isValid = 0
      }
    }
  }
  return sum
}
const sample = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`
const input = parse(readFileSync(`${dir.join('/')}/AT/input.txt`, 'utf-8'))
console.log(part1(parse(sample)))
console.log(part1(input))