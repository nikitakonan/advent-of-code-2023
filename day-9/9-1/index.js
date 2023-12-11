const fs = require('fs');
const sum = require('../../utils/sum');

function getNextSequence(arr = []) {
  if (arr.length < 2) {
    return [];
  }
  const nextSequence = [];
  for (let i = 0; i < arr.length - 1; i++) {
    nextSequence.push(arr[i + 1] - arr[i]);
  }
  return nextSequence;
}

function getNextValue(arr = []) {
  const nextSequence = getNextSequence(arr);
  if (nextSequence.every((x) => x === 0)) {
    return 0 + arr.at(-1);
  } else {
    return arr.at(-1) + getNextValue(nextSequence);
  }
}

fs.readFile('./day-9/9-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const result = data
    .toString()
    .split(/\r?\n/)
    .map((line) => line.split(' ').map(Number))
    .map(getNextValue)
    .reduce(sum);
  console.log(result);
});
