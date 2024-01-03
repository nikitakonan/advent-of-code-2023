import { readFile } from 'fs';
import { join } from 'path';
import { INPUT, TEST_INPUT } from '../../utils/consts';
import { Beam, Direction, type Grid, type GridItem } from './types';
import { getNextBeams } from './getNextBeams';

function calculateEnergized(grid: Grid, start: Beam) {
  const visited = new Set();
  const energized = new Set();
  const beamQueue: Beam[] = [start];
  visited.add(start.getId());
  energized.add(start.position.toString());

  while (beamQueue.length > 0) {
    const b = beamQueue.shift();
    const newBeams = getNextBeams(grid, b).filter(
      (b) => !visited.has(b.getId())
    );
    newBeams.forEach((b) => {
      beamQueue.push(b);
      visited.add(b.getId());
      energized.add(b.position.toString());
    });
  }
  return energized.size;
}

function getStartBeams(grid: Grid): Beam[] {
  const rows = grid.length;
  const columns = grid[0].length;
  const rowIndices = Array(rows)
    .fill(undefined)
    .map((_x, i) => i);
  const colIndices = Array(columns)
    .fill(undefined)
    .map((_x, i) => i);
  const rightBeams = rowIndices.map((i) => new Beam(Direction.Right, [0, i]));
  const leftBeams = rowIndices.map(
    (i) => new Beam(Direction.Left, [columns - 1, i])
  );
  const topBeams = colIndices.map((i) => new Beam(Direction.Down, [i, 0]));
  const bottomBeams = colIndices.map(
    (i) => new Beam(Direction.Up, [i, rows - 1])
  );

  return [...rightBeams, ...leftBeams, ...topBeams, ...bottomBeams];
}

readFile(join(__dirname, INPUT), (err, data) => {
  if (err) {
    throw err;
  }

  const grid: Grid = data
    .toString()
    .split('\n')
    .map((line) => line.split('') as GridItem[]);

  const result = getStartBeams(grid)
    .map((b) => calculateEnergized(grid, b))
    .reduce((a, b) => Math.max(a, b));
  console.log(result);
});
