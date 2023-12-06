const fs = require('fs');
const multiply = require('../../utils/multiply');

function parseLine(line = '') {
  return line
    .split(':')[1]
    .split(' ')
    .filter((x) => x !== '')
    .map(Number);
}

function getRaces([timeArray, distanceArray]) {
  return timeArray.map((time, i) => ({ time, distance: distanceArray[i] }));
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

  const parsed = data.toString().split(/\r?\n/).map(parseLine);
  const result = getRaces(parsed).map(getWinDistancesCount).reduce(multiply);
  console.log(result);
});
