const fs = require('fs');
const sum = require('../../utils/sum');

function getPatterns(lines = []) {
  const patterns = [];
  let index = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === '') {
      index++;
      continue;
    }
    if (!patterns[index]) {
      patterns[index] = [];
    }
    const pattern = patterns[index];
    pattern.push(line.split(''));
  }
  return patterns;
}

function areMirrored(left, right) {
  let result = [[], []];
  const length = Math.min(left.length, right.length);
  for (let i = 0; i < length; i++) {
    const a = left.at(-1 - i);
    const b = right.at(i);
    result[0].push(a);
    result[1].push(b);
  }
  return result[0].toString() === result[1].toString();
}

function getMirrors(arr = []) {
  const mirrors = [];
  for (let i = 1; i < arr.length; i++) {
    const left = arr.slice(0, i);
    const right = arr.slice(i);
    const mirrored = areMirrored(left, right);
    if (mirrored) {
      mirrors.push([i - 1, i]);
    }
  }
  return mirrors;
}

function transpose(arr) {
  return arr[0].map((_col, i) => arr.map((row) => row[i]));
}

function getVerticalReflection(pattern = [[]]) {
  const [m] = pattern.map(getMirrors).reduce((prev, next) => {
    return prev.filter((a) =>
      next.map((x) => x.toString()).includes(a.toString())
    );
  });
  return m ? m[0] : -1;
}

function getScore(pattern = [[]]) {
  const leftCol = getVerticalReflection(pattern);
  if (leftCol !== -1) {
    return leftCol + 1;
  } else {
    return (getVerticalReflection(transpose(pattern)) + 1) * 100;
  }
}

fs.readFile('./day-13/13-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const lines = data.toString().split(/\r?\n/);
  const result = getPatterns(lines).map(getScore).reduce(sum);
  console.log(result);
});
