import { readFile } from 'fs';
import { join } from 'path';
import { TEST_INPUT } from '../../utils/consts';

const PATH = '.';
const FOREST = '#';
const SLOPE_UP = '^';
const SLOPE_DOWN = 'v';
const SLOPE_LEFT = '<';
const SLOPE_RIGHT = '>';

readFile(join(__dirname, TEST_INPUT), (err, data) => {
  if (err) {
    throw err;
  }

  const map = data
    .toString()
    .split('\n')
    .map((line) => line.split(''));
  console.log(map.map((x) => x.length));
});
