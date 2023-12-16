const fs = require('fs');
const path = require('path');
const sum = require('../../utils/sum');

const ROUND_ROCK = 'O';
const HARD_ROCK = '#';
const GROUND = '.';

function tiltNorth(platform = [[]]) {
  const rowCount = platform.length;
  const columnCount = platform[0].length;
  for (let col = 0; col < columnCount; col++) {
    let vacantRowIndex = 0;
    for (let row = 0; row < rowCount; row++) {
      const el = platform[row][col];
      if (el === HARD_ROCK) {
        vacantRowIndex = row + 1;
      } else if (el === ROUND_ROCK) {
        if (row !== vacantRowIndex) {
          platform[vacantRowIndex][col] = el;
          platform[row][col] = GROUND;
          vacantRowIndex++;
        } else {
          vacantRowIndex = row + 1;
        }
      }
    }
  }
  return platform;
}

function tiltFourDirections(platform = [[]]) {
  const rowCount = platform.length;
  const columnCount = platform[0].length;
  const oPlaces = [];

  // north
  for (let col = 0; col < columnCount; col++) {
    let vacantRowIndex = 0;
    for (let row = 0; row < rowCount; row++) {
      const el = platform[row][col];
      if (el === HARD_ROCK) {
        vacantRowIndex = row + 1;
      } else if (el === ROUND_ROCK) {
        if (row !== vacantRowIndex) {
          platform[vacantRowIndex][col] = el;
          platform[row][col] = GROUND;
          vacantRowIndex++;
        } else {
          vacantRowIndex = row + 1;
        }
      }
    }
  }

  // west
  for (let row = 0; row < rowCount; row++) {
    let vacantColIndex = 0;
    for (let col = 0; col < columnCount; col++) {
      const el = platform[row][col];
      if (el === HARD_ROCK) {
        vacantColIndex = col + 1;
      } else if (el === ROUND_ROCK) {
        if (col !== vacantColIndex) {
          platform[row][vacantColIndex] = el;
          platform[row][col] = GROUND;
          vacantColIndex++;
        } else {
          vacantColIndex = col + 1;
        }
      }
    }
  }

  // south
  for (let col = 0; col < columnCount; col++) {
    let vacantRowIndex = rowCount - 1;
    for (let row = rowCount - 1; row >= 0; row--) {
      const el = platform[row][col];
      if (el === HARD_ROCK) {
        vacantRowIndex = row - 1;
      } else if (el === ROUND_ROCK) {
        if (row !== vacantRowIndex) {
          platform[vacantRowIndex][col] = el;
          platform[row][col] = GROUND;
          vacantRowIndex--;
        } else {
          vacantRowIndex = row - 1;
        }
      }
    }
  }

  // east
  for (let row = 0; row < rowCount; row++) {
    let vacantColIndex = columnCount - 1;
    for (let col = columnCount - 1; col >= 0; col--) {
      const el = platform[row][col];
      if (el === HARD_ROCK) {
        vacantColIndex = col - 1;
      } else if (el === ROUND_ROCK) {
        if (col !== vacantColIndex) {
          oPlaces.push(`${row},${vacantColIndex}`);
          platform[row][vacantColIndex] = el;
          platform[row][col] = GROUND;
          vacantColIndex--;
        } else {
          oPlaces.push(`${row},${col}`);
          vacantColIndex = col - 1;
        }
      }
    }
  }

  return oPlaces;
}

function calculateLoad(row, index, platform) {
  const perRockLoad = platform.length - index;
  const roundRocksCount = row.filter((r) => r === ROUND_ROCK).length;
  return perRockLoad * roundRocksCount;
}

fs.readFile(path.join(__dirname, 'input.txt'), (err, data) => {
  if (err) {
    throw err;
  }

  const platform = data
    .toString()
    .split(/\r?\n/)
    .map((line) => line.split(''));

  const iterations = 1_000_000_000;
  const start = performance.now();
  let oPlaces = '';
  for (let i = 0; i < iterations; i++) {
    let tmp = tiltFourDirections(platform);
    console.log(
      `processed ${i + 1} of ${iterations} - ${(
        ((i + 1) * 100) /
        iterations
      ).toFixed(2)}%`
    );
    tmp = tmp.join(';');
    if (tmp === oPlaces) {
      console.log(`break at ${i + 1}`);
      break;
    }
    oPlaces = tmp.slice();
  }
  const end = performance.now();
  console.log('done for: ', end - start);
  const result = platform.map(calculateLoad).reduce(sum);
  fs.writeFile(path.join(__dirname, 'result.txt'), result.toString(), (err) => {
    if (err) {
      throw err;
    }
  });
});
