const fs = require('fs');

function parseLine(line = '') {
  const [a, b] = line.split(':');
  const value = b.split(' ').join('');
  return [a.toLowerCase(), +value];
}

function getWinDistancesCount({ time, distance }) {
  const distances = [];
  for (let holdTime = 0; holdTime <= time; holdTime++) {
    const raceTime = time - holdTime;
    const speed = holdTime;
    const distance = speed * raceTime;
    distances.push(distance);
  }
  return distances.filter((d) => d > distance).length;
}

fs.readFile('./day-6/6-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const race = data
    .toString()
    .split(/\r?\n/)
    .map(parseLine)
    .reduce((acc, curr) => {
      acc[curr[0]] = curr[1];
      return acc;
    }, {});

  const result = getWinDistancesCount(race);
  console.log(result);
});
