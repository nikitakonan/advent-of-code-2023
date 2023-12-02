const fs = require('fs');
const isNumber = require('../../utils/isNumber');
const sum = require('../../utils/sum');

const numbers = [
  ['one', 1],
  ['two', 2],
  ['three', 3],
  ['four', 4],
  ['five', 5],
  ['six', 6],
  ['eight', 8],
  ['nine', 9],
];

function transformLine(line) {
  const characters = line.split('');
  // calculate start indexes
  for (let i = 0; i < characters.length; i++) {
    //
  }
  return line;
}

function getCalibrationValue(line = '') {
  const numbers = transformLine(line);
  return Number(`${numbers.at(0)}${numbers.at(-1)}`);
}

fs.readFile('./day-1/1-2/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const result = data
    .toString()
    .split(/\r?\n/)
    .map(getCalibrationValue)
    .reduce(sum);
  console.log(result);
});
