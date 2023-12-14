const fs = require('fs');
const sum = require('../../utils/sum');

const ROUND_ROCK = 'O';
const HARD_ROCK = '#';
const GROUND = '.';

function tiltNorth(platform = [[]]) {
  const rowCount = platform.length;
  const columnCount = platform[0].length;
  const tilted = Array(rowCount)
    .fill()
    .map(() => Array(columnCount).fill());
  for (let col = 0; col < columnCount; col++) {
    let vacantRowIndex = 0;
    for (let row = 0; row < rowCount; row++) {
      const el = platform[row][col];
      if (el === HARD_ROCK) {
        vacantRowIndex = row + 1;
        tilted[row][col] = el;
      } else if (el === ROUND_ROCK) {
        if (row !== vacantRowIndex) {
          tilted[vacantRowIndex][col] = el;
          tilted[row][col] = GROUND;
          vacantRowIndex++;
        } else {
          tilted[row][col] = el;
          vacantRowIndex = row + 1;
        }
      } else if (el === GROUND) {
        tilted[row][col] = el;
      }
    }
  }
  return tilted;
}

function calculateLoad(row, index, platform) {
  const perRockLoad = platform.length - index;
  const roundRocksCount = row.filter((r) => r === ROUND_ROCK).length;
  return perRockLoad * roundRocksCount;
}

fs.readFile('./day-14/14-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const platform = data
    .toString()
    .split(/\r?\n/)
    .map((line) => line.split(''));

  const result = tiltNorth(platform).map(calculateLoad).reduce(sum);
  console.log(result);
});
