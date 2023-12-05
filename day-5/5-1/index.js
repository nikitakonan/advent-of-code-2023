const fs = require('fs');
const compose = require('../../utils/compose');
const min = require('../../utils/min');

const mapKeys = [
  'seedToSoilMap',
  'soilToFertilizerMap',
  'fertilizerToWaterMap',
  'waterToLightMap',
  'lightToTemperatureMap',
  'temperatureToHumidityMap',
  'humidityToLocationMap',
];

function getConvertDataFn(maps = [], _key) {
  return function convert(data = []) {
    return data.map((item) => {
      for (let map of maps) {
        const { destRangeStart, sourceRangeStart, rangeLength } = map;
        const sourceRangeEnd = sourceRangeStart + rangeLength;
        const isInRange = item >= sourceRangeStart && item < sourceRangeEnd;
        if (isInRange) {
          const sub = item - sourceRangeStart;
          return destRangeStart + sub;
        }
      }

      return item;
    });
  };
}

function parseSeeds(line = '') {
  const txt = line.split(':')[1].trim();
  return txt.split(' ').map(Number);
}

function parseMapItem(line = '') {
  const [destRangeStart, sourceRangeStart, rangeLength] = line
    .split(' ')
    .map(Number);

  return {
    destRangeStart,
    sourceRangeStart,
    rangeLength,
  };
}

function parseData(lines = []) {
  const data = {
    seeds: [],
    seedToSoilMap: [],
    soilToFertilizerMap: [],
    fertilizerToWaterMap: [],
    waterToLightMap: [],
    lightToTemperatureMap: [],
    temperatureToHumidityMap: [],
    humidityToLocationMap: [],
  };
  let nextMapIndex = -1;
  let indexToSkip = -1;
  lines.forEach((line, index) => {
    if (index === indexToSkip) {
      return;
    }
    if (index === 0) {
      data.seeds = parseSeeds(line);
      return;
    }
    if (line === '') {
      nextMapIndex++;
      indexToSkip = index + 1;
      return;
    }
    const nextMapKey = mapKeys[nextMapIndex];
    data[nextMapKey].push(parseMapItem(line));
  });
  return data;
}

fs.readFile('./day-5/5-1/input.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const lines = data.toString().split(/\r?\n/);
  const { seeds, ...maps } = parseData(lines);

  const fns = mapKeys.reverse().map((key) => getConvertDataFn(maps[key], key));
  const processData = compose(...fns);
  const result = processData(seeds).reduce(min);
  console.log(result);
});
