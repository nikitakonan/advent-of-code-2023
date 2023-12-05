const fs = require('fs');
const compose = require('../../utils/compose');
const min = require('../../utils/min');
const sum = require('../../utils/sum');
const { performance, PerformanceObserver } = require('perf_hooks');

const perfObserver = new PerformanceObserver((items) => {
  const entries = items.getEntries();
  const totalDuration = entries.map((item) => item.duration).reduce(sum);
  const avgDuration = totalDuration / entries.length;
  console.log(avgDuration);
});

perfObserver.observe({ entryTypes: ['measure'], buffer: true });

const mapKeys = [
  'seedToSoilMap',
  'soilToFertilizerMap',
  'fertilizerToWaterMap',
  'waterToLightMap',
  'lightToTemperatureMap',
  'temperatureToHumidityMap',
  'humidityToLocationMap',
];

function convertItem(item, maps) {
  const mapsLength = maps.length;
  for (let i = 0; i < mapsLength; i++) {
    const { destRangeStart, sourceRangeStart, rangeLength } = maps[i];
    const sourceRangeEnd = sourceRangeStart + rangeLength;
    const isInRange = item >= sourceRangeStart && item < sourceRangeEnd;
    if (isInRange) {
      const sub = item - sourceRangeStart;
      return destRangeStart + sub;
    }
  }

  return item;
}

function getConvertDataFn(maps = [], _key) {
  return function convertItem(item) {
    const mapsLength = maps.length;
    for (let i = 0; i < mapsLength; i++) {
      const { destRangeStart, sourceRangeStart, rangeLength } = maps[i];
      const sourceRangeEnd = sourceRangeStart + rangeLength;
      const isInRange = item >= sourceRangeStart && item < sourceRangeEnd;
      if (isInRange) {
        const sub = item - sourceRangeStart;
        return destRangeStart + sub;
      }
    }

    return item;
  };
}

function parseSeeds(line = '') {
  const txt = line.split(':')[1].trim();
  return txt.split(' ').map(Number);
}

function* seedGenerator(ranges) {
  for (let i = 0; i < ranges.length; i++) {
    if (i % 2 !== 0) {
      continue;
    }
    const start = ranges[i];
    const length = ranges[i + 1];
    const end = start + length;

    let item = start;
    while (item < end) {
      yield item;
      item++;
    }
  }
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

  const gen = seedGenerator(seeds);
  const totalSeeds = seeds.filter((x) => x % 2 === 1).reduce(sum);
  console.log(totalSeeds);
  let current = 0;
  let result = 0;
  for (let next of gen) {
    ++current;
    // console.log(((current * 100) / totalSeeds).toFixed(2) + '%');

    // performance start
    performance.mark('example-start');
    const soil = convertItem(next, maps.seedToSoilMap);
    const fertilizer = convertItem(soil, maps.soilToFertilizerMap);
    const water = convertItem(fertilizer, maps.fertilizerToWaterMap);
    const light = convertItem(water, maps.waterToLightMap);
    const temperature = convertItem(light, maps.lightToTemperatureMap);
    const humidity = convertItem(temperature, maps.temperatureToHumidityMap);
    const location = convertItem(humidity, maps.humidityToLocationMap);
    performance.mark('example-end');
    performance.measure('example', 'example-start', 'example-end');
    // performance end
    if (current === 1000) {
      break;
    }

    // console.log(next, '->', newMin);
    // if (newMin < result) {
    //   result = newMin;
    //   console.log('NEW MIN: ', result);
    // }
  }
  console.log(result);
});
