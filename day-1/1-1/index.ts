import { readFile } from 'fs';
import { join } from 'path';
import isNumber from '../../utils/isNumber';
import sum from '../../utils/sum';
import { INPUT } from '../../utils/consts';

function getCalibrationValue(line: string) {
  const numbers = line.split('').map(Number).filter(isNumber);
  return Number(`${numbers.at(0)}${numbers.at(-1)}`);
}

readFile(join(__dirname, INPUT), (err, data) => {
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
