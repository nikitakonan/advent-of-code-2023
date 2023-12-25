import { readFile } from 'fs';
import { join } from 'path';
import { TEST_INPUT } from '../../utils/consts';

const PATH = '.';
const FOREST = '#';
const SLOPE_UP = '^';
const SLOPE_DOWN = 'v';
const SLOPE_LEFT = '<';
const SLOPE_RIGHT = '>';

type MapItem =
  | typeof PATH
  | typeof FOREST
  | typeof SLOPE_UP
  | typeof SLOPE_DOWN
  | typeof SLOPE_LEFT
  | typeof SLOPE_RIGHT;
type Coords = [number, number];
type Map<T> = T[][];

class TreeNode {
  position: Coords;
  distance: number;
  constructor(position: Coords, distance: number) {
    this.position = position;
    this.distance = distance;
  }
  toString() {
    return this.position.toString();
  }
}

function getPositions([x, y]: Coords): Coords[] {
  return [
    [x, y - 1], // 0, up
    [x + 1, y], // 1, right
    [x, y + 1], // 2, down
    [x - 1, y], // 3, left
  ];
}

function getItemAt<T>(map: Map<T>, [x, y]: Coords) {
  const row = map[y];
  return row ? row[x] : undefined;
}

function getLongestPath<T>(map: Map<T>, from: Coords, to: Coords) {
  let longestPath = 0;
  const root = new TreeNode(from, 0);
  const visited = new Set<string>();
  const queue = [root];
  visited.add(root.toString());

  while (queue.length > 0) {
    const currentRoot = queue.shift();
    if (currentRoot.toString() === to.toString()) {
      longestPath = currentRoot.distance;
      console.log(longestPath);
    }
    const currentItem = getItemAt(map, currentRoot.position);
    getPositions(currentRoot.position)
      .filter((_coords, i) => {
        if (currentItem === SLOPE_DOWN) {
          return i === 2;
        } else if (currentItem === SLOPE_UP) {
          return i === 0;
        } else if (currentItem === SLOPE_LEFT) {
          return i === 3;
        } else if (currentItem === SLOPE_RIGHT) {
          return i === 1;
        }
        return true;
      })
      .filter((coords) => {
        const nextItem = getItemAt(map, coords);
        return Boolean(nextItem) && nextItem !== FOREST;
      })
      .filter((pos) => !visited.has(pos.toString()))
      .map((pos) => new TreeNode(pos, currentRoot.distance + 1))
      .forEach((node) => {
        queue.push(node);
        visited.add(node.toString());
      });
  }
  return longestPath;
}

function findStart<T>(map: Map<T>): Coords {
  return [map[0].findIndex((el) => el === PATH), 0];
}

function findEnd<T>(map: Map<T>): Coords {
  return [map.at(-1).findIndex((el) => el === PATH), map.length - 1];
}

readFile(join(__dirname, TEST_INPUT), (err, data) => {
  if (err) {
    throw err;
  }

  const map = data
    .toString()
    .split('\n')
    .map((line) => line.split('') as MapItem[]);

  const from = findStart(map);
  const to = findEnd(map);
  const shortestPath = getLongestPath(map, from, to);
  console.log(shortestPath);
});
