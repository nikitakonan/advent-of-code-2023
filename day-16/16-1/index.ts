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

readFile(join(__dirname, INPUT), (err, data) => {
  if (err) {
    throw err;
  }

  const grid: Grid = data
    .toString()
    .split('\n')
    .map((line) => line.split('') as GridItem[]);

  const result = calculateEnergized(grid, new Beam(Direction.Right, [0, 0]));
  console.log(result);
});
