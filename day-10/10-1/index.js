const fs = require('fs');

// directions
const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;

// elements
const START = 'S';
const NORTH_SOUTH = '|';
const EAST_WEST = '-';
const NORTH_EAST = 'L';
const NORTH_WEST = 'J';
const SOUTH_WEST = '7';
const SOUTH_EAST = 'F';
const GROUND = '.';

const elementDirMap = new Map([
  [START, [NORTH, EAST, SOUTH, WEST]],
  [NORTH_SOUTH, [NORTH, SOUTH]],
  [EAST_WEST, [EAST, WEST]],
  [NORTH_EAST, [NORTH, EAST]],
  [NORTH_WEST, [NORTH, WEST]],
  [SOUTH_WEST, [SOUTH, WEST]],
  [SOUTH_EAST, [SOUTH, EAST]],
  [GROUND, []],
]);

function getStartPosition(map) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === START) {
        return [x, y];
      }
    }
  }
  return [0, 0];
}

function getElementAtPosFactory(map) {
  return function getElementAtPos([x, y]) {
    const row = map[y];
    return !row ? undefined : row[x];
  };
}

function isSamePosition(pos1, pos2) {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

function getPositionByDirection([x, y], direction) {
  if (direction === NORTH) {
    return [x, y - 1];
  } else if (direction === EAST) {
    return [x + 1, y];
  } else if (direction === SOUTH) {
    return [x, y + 1];
  } else if (direction === WEST) {
    return [x - 1, y];
  }
}

function getNextStepPoint(stepPoint) {
  const from = {
    element: stepPoint.element,
    position: stepPoint.position.slice(),
  };

  const [position] = elementDirMap
    .get(stepPoint.element)
    .map((dir) => getPositionByDirection(stepPoint.position, dir))
    .filter((pos) => !isSamePosition(pos, stepPoint.from.position));

  return { from, position };
}

fs.readFile('./day-10/10-1/testInput.txt', (err, data) => {
  if (err) {
    throw err;
  }

  const map = data
    .toString()
    .split(/\r?\n/)
    .map((l) => l.split(''));

  const startPosition = getStartPosition(map);
  const getElementAtPos = getElementAtPosFactory(map);

  let stepPoint1 = { from: null, position: startPosition, element: START };
  let stepPoint2 = { from: null, position: startPosition, element: START };
  let step = 0;

  while (
    !isSamePosition(stepPoint1.position, stepPoint2.position) ||
    step === 0
  ) {
    if (step === 0) {
      const res = elementDirMap
        .get(START)
        .map((dir) => {
          const pos = getPositionByDirection(startPosition, dir);
          const element = getElementAtPos(pos);
          return { element, position: pos };
        })
        .filter(({ position, element }) => {
          const elementDirs = elementDirMap.get(element) || [];
          const [isConnected] = elementDirs
            .map((dir) => getPositionByDirection(position, dir))
            .filter((pos) => isSamePosition(pos, startPosition));
          return isConnected;
        });
      stepPoint1.from = { element: START, position: startPosition };
      stepPoint1.position = res[0].position;
      stepPoint1.element = res[0].element;

      stepPoint2.from = { element: START, position: startPosition };
      stepPoint2.position = res[1].position;
      stepPoint2.element = res[1].element;
    } else {
      stepPoint1 = getNextStepPoint(stepPoint1);
      stepPoint1.element = getElementAtPos(stepPoint1.position);
      stepPoint2 = getNextStepPoint(stepPoint2);
      stepPoint2.element = getElementAtPos(stepPoint2.position);
    }
    step++;
  }

  const result = step;
  console.log(result);
});
