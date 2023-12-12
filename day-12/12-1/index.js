const fs = require('fs');
const sum = require('../../utils/sum');

// States
const UNKNOWN = '?';
const WORKING = '.';
const DAMAGED = '#';

function parseLine(line = '') {
  const [springs, groupsText] = line.split(' ');
  return {
    springs,
    groups: groupsText.split(',').map(Number),
  };
}

function getVariantsArray(count) {
  if (count === 1) {
    return [WORKING, DAMAGED];
  }
  const variants = [];
  const prevVariants = getVariantsArray(count - 1);
  for (let i = 0; i < prevVariants.length; i++) {
    variants.push(WORKING + prevVariants[i]);
    variants.push(DAMAGED + prevVariants[i]);
  }
  return variants;
}

function replace(line, variant) {
  const varArray = variant.split('');
  let nextIndex = 0;
  const chars = line.split('');
  const replaced = [];
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === UNKNOWN) {
      const next = varArray[nextIndex];
      replaced.push(next);
      nextIndex++;
    } else {
      replaced.push(chars[i]);
    }
  }
  return replaced.join('');
}

function getVariants({ springs = '', groups = [] }) {
  const numberOfUnknown = springs.split('').filter((x) => x === UNKNOWN).length;
  const vars = getVariantsArray(numberOfUnknown);
  const replaced = vars
    .map((v) => replace(springs, v))
    .map((v) =>
      v
        .split(WORKING)
        .filter((x) => x !== '')
        .map((x) => x.length)
    )
    .filter((g) => g.toString() === groups.toString());

  return replaced.length;
}

fs.readFile('./day-12/12-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }
  const result = data
    .toString()
    .split(/\r?\n/)
    .map(parseLine)
    .map((o, i, arr) => {
      console.log(`get variant ${i + 1} of ${arr.length}`);
      return getVariants(o);
    })
    .reduce(sum);
  console.log(result);
});
