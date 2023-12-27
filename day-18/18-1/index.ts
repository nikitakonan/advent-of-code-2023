import { readFile } from 'fs';
import { join } from 'path';
import { INPUT, TEST_INPUT } from '../../utils/consts';

const R = 'R';
const D = 'D';
const U = 'U';
const L = 'L';

type Direction = typeof R | typeof D | typeof U | typeof L;
type Coords = [x: number, y: number];

interface Instruction {
  direction: Direction;
  amount: number;
  color: string;
}

function parseLine(line = ''): Instruction {
  const [dirStr, numberStr, colorStr] = line.split(' ');
  return {
    direction: dirStr as Direction,
    amount: Number(numberStr),
    color: colorStr.slice(1, -1),
  };
}

function getPoint2(direction: Direction, [x, y]: Coords, amount = 1): Coords {
  if (direction === R) {
    return [x + amount, y];
  } else if (direction === L) {
    return [x - amount, y];
  } else if (direction === U) {
    return [x, y - amount];
  } else if (direction === D) {
    return [x, y + amount];
  }
}

function buildPolygon(instructions: Instruction[]) {
  const data: {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    polygon: Coords[];
  } = {
    xMin: Number.MAX_VALUE,
    xMax: Number.MIN_VALUE,
    yMin: Number.MAX_VALUE,
    yMax: Number.MIN_VALUE,
    polygon: [[0, 0]],
  };

  instructions.forEach((instruction) => {
    const { direction, amount } = instruction;
    const point1 = data.polygon.at(-1);
    const point2 = getPoint2(direction, point1, amount);
    if (point2.toString() !== data.polygon[0].toString()) {
      data.polygon.push(point2);
    }
    data.xMax = Math.max(point1[0], point2[0], data.xMax);
    data.xMin = Math.min(point1[0], point2[0], data.xMin);
    data.yMax = Math.max(point1[1], point2[1], data.yMax);
    data.yMin = Math.min(point1[1], point2[1], data.yMin);
  });

  return data;
}

function isOnLine([x1, y1]: Coords, [x2, y2]: Coords, [x, y]: Coords) {
  return (
    x <= Math.max(x1, x2) &&
    x >= Math.min(x1, x2) &&
    y <= Math.max(y1, y2) &&
    y >= Math.min(y1, y2)
  );
}

function isInside(edges: Coords[], [xp, yp]: Coords): boolean {
  let cnt = 0;
  for (let i = 0; i < edges.length; i++) {
    const [x1, y1] = edges[i];
    const j = (i + 1) % edges.length;
    const [x2, y2] = edges[j];
    if (isOnLine([x1, y1], [x2, y2], [xp, yp])) {
      return true;
    }
    if (yp < y1 !== yp < y2 && xp < x1 + ((yp - y1) / (y2 - y1)) * (x2 - x1)) {
      cnt += 1;
    }
  }
  return cnt % 2 === 1;
}

readFile(join(__dirname, INPUT), (err, data) => {
  if (err) {
    throw err;
  }

  let result = 0;
  const instructions = data.toString().split('\n').map(parseLine);
  const { xMin, xMax, yMin, yMax, polygon } = buildPolygon(instructions);
  for (let y = yMin; y <= yMax; y++) {
    for (let x = xMin; x <= xMax; x++) {
      if (isInside(polygon, [x, y])) {
        result++;
      }
    }
  }
  console.log(result);
});
