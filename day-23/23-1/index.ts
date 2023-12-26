import { readFile } from 'fs';
import { join } from 'path';
import { INPUT, TEST_INPUT } from '../../utils/consts';

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

function getItemAt<T>(map: Map<T>, [x, y]: Coords) {
  const row = map[y];
  return row ? row[x] : undefined;
}

function setItemAt<T>(map: Map<T>, [x, y]: Coords, value: T) {
  const row = map[y];
  if (row) {
    row[x] = value;
  }
}

function isSafe<T>(mat: Map<T>, visited: Map<boolean>, [x, y]: Coords) {
  const m = getItemAt(mat, [x, y]);
  const v = getItemAt(visited, [x, y]);
  return (
    x >= 0 &&
    x < mat.length &&
    y >= 0 &&
    y < mat[0].length &&
    m !== FOREST &&
    !v
  );
}

const getTopCell = ([x, y]: Coords): Coords => [x, y - 1];
const getBottomCell = ([x, y]: Coords): Coords => [x, y + 1];
const getLeftCell = ([x, y]: Coords): Coords => [x - 1, y];
const getRightCell = ([x, y]: Coords): Coords => [x + 1, y];
const areEqual = ([x1, y1]: Coords, [x2, y2]: Coords) => x1 === x2 && y1 === y2;

const isBottomSafe = (item: MapItem) => {
  return item !== SLOPE_UP && item !== SLOPE_LEFT && item !== SLOPE_RIGHT;
};
const isUpSafe = (item: MapItem) => {
  return item !== SLOPE_DOWN && item !== SLOPE_LEFT && item !== SLOPE_RIGHT;
};
const isRightSafe = (item: MapItem) => {
  return item !== SLOPE_UP && item !== SLOPE_DOWN && item !== SLOPE_LEFT;
};
const isLeftSafe = (item: MapItem) => {
  return item !== SLOPE_UP && item !== SLOPE_DOWN && item !== SLOPE_RIGHT;
};

function findLongestPath(
  mat: Map<MapItem>,
  visited: Map<boolean>,
  source: Coords,
  dest: Coords,
  maxDist: number,
  dist: number
) {
  // if the destination is not possible from the current cell
  const sourceItem = getItemAt(mat, source);
  if (sourceItem === FOREST) {
    return 0;
  }

  // if the destination is found, update `max_dist`
  if (areEqual(source, dest)) {
    return Math.max(dist, maxDist);
  }

  setItemAt(visited, source, true);

  const bottomCell = getBottomCell(source);
  if (isSafe(mat, visited, bottomCell) && isBottomSafe(sourceItem)) {
    maxDist = findLongestPath(
      mat,
      visited,
      bottomCell,
      dest,
      maxDist,
      dist + 1
    );
  }

  const rightCell = getRightCell(source);
  if (isSafe(mat, visited, rightCell) && isRightSafe(sourceItem)) {
    maxDist = findLongestPath(mat, visited, rightCell, dest, maxDist, dist + 1);
  }

  const topCell = getTopCell(source);
  if (isSafe(mat, visited, topCell) && isUpSafe(sourceItem)) {
    maxDist = findLongestPath(mat, visited, topCell, dest, maxDist, dist + 1);
  }

  const leftCell = getLeftCell(source);
  if (isSafe(mat, visited, leftCell) && isLeftSafe(sourceItem)) {
    maxDist = findLongestPath(mat, visited, leftCell, dest, maxDist, dist + 1);
  }

  // backtrack: remove (i, j) from the visited matrix
  setItemAt(visited, source, false);

  return maxDist;
}

function findStart<T>(map: Map<T>): Coords {
  return [map[0].findIndex((el) => el === PATH), 0];
}

function findEnd<T>(map: Map<T>): Coords {
  return [map.at(-1).findIndex((el) => el === PATH), map.length - 1];
}

readFile(join(__dirname, INPUT), (err, data) => {
  if (err) {
    throw err;
  }

  const map = data
    .toString()
    .split('\n')
    .map((line) => line.split('') as MapItem[]);

  const rowsCount = map.length;
  const colsCount = map[0].length;
  const from = findStart(map);
  const to = findEnd(map);
  const visited = Array(rowsCount)
    .fill(undefined)
    .map(() => Array(colsCount).slice());
  const longestPath = findLongestPath(map, visited, from, to, 0, 0);
  console.log(longestPath);
});
