const fs = require('fs');
const isNumber = require('../../utils/isNumber');
const sum = require('../../utils/sum');

function getCalibrationValue(line = '') {
  const numbers = line.split('').map(Number).filter(isNumber);
  return Number(`${numbers.at(0)}${numbers.at(-1)}`);
}

fs.readFile('./day-1/1-1/input.txt', (err, data) => {
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
