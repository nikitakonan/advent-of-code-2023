import {
  Beam,
  type BeamGetter,
  Direction,
  type Grid,
  type GridItem,
  MIRROR_LEFT,
  MIRROR_RIGHT,
  type Position,
  SPACE,
  SPLITTER_HORIZONTAL,
  SPLITTER_VERTICAL,
} from './types';

const beamGetter: BeamGetter = {
  [SPACE]: ({ inputDirection, position }: Beam): Beam[] => {
    const [x, y] = position;
    switch (inputDirection) {
      case Direction.Down:
        return [new Beam(inputDirection, [x, y + 1])];
      case Direction.Up:
        return [new Beam(inputDirection, [x, y - 1])];
      case Direction.Left:
        return [new Beam(inputDirection, [x - 1, y])];
      case Direction.Right:
        return [new Beam(inputDirection, [x + 1, y])];
    }
  },
  [MIRROR_RIGHT]: ({ inputDirection, position }: Beam): Beam[] => {
    const [x, y] = position;
    switch (inputDirection) {
      case Direction.Down:
        return [new Beam(Direction.Left, [x - 1, y])];
      case Direction.Up:
        return [new Beam(Direction.Right, [x + 1, y])];
      case Direction.Left:
        return [new Beam(Direction.Down, [x, y + 1])];
      case Direction.Right:
        return [new Beam(Direction.Up, [x, y - 1])];
    }
  },
  [MIRROR_LEFT]: ({ inputDirection, position }: Beam): Beam[] => {
    const [x, y] = position;
    switch (inputDirection) {
      case Direction.Down:
        return [new Beam(Direction.Right, [x + 1, y])];
      case Direction.Up:
        return [new Beam(Direction.Left, [x - 1, y])];
      case Direction.Left:
        return [new Beam(Direction.Up, [x, y - 1])];
      case Direction.Right:
        return [new Beam(Direction.Down, [x, y + 1])];
    }
  },
  [SPLITTER_HORIZONTAL]: ({ inputDirection, position }: Beam): Beam[] => {
    const [x, y] = position;
    switch (inputDirection) {
      case Direction.Down:
        return [
          new Beam(Direction.Left, [x - 1, y]),
          new Beam(Direction.Right, [x + 1, y]),
        ];
      case Direction.Up:
        return [
          new Beam(Direction.Left, [x - 1, y]),
          new Beam(Direction.Right, [x + 1, y]),
        ];
      case Direction.Left:
        return [new Beam(inputDirection, [x - 1, y])];
      case Direction.Right:
        return [new Beam(inputDirection, [x + 1, y])];
    }
  },
  [SPLITTER_VERTICAL]: ({ inputDirection, position }: Beam): Beam[] => {
    const [x, y] = position;
    switch (inputDirection) {
      case Direction.Down:
        return [new Beam(inputDirection, [x, y + 1])];
      case Direction.Up:
        return [new Beam(inputDirection, [x, y - 1])];
      case Direction.Left:
        return [
          new Beam(Direction.Up, [x, y - 1]),
          new Beam(Direction.Down, [x, y + 1]),
        ];
      case Direction.Right:
        return [
          new Beam(Direction.Up, [x, y - 1]),
          new Beam(Direction.Down, [x, y + 1]),
        ];
    }
  },
};

function getValueAt(grid: Grid, [x, y]: Position): GridItem {
  return grid[y]?.[x];
}

function isValidPosition(grid: Grid, [x, y]: Position) {
  const rows = grid.length;
  const columns = grid[0].length;
  return x >= 0 && x < columns && y >= 0 && y < rows;
}

export function getNextBeams(grid: Grid, beam: Beam): Beam[] {
  const value = getValueAt(grid, beam.position);
  return beamGetter[value](beam).filter((b) =>
    isValidPosition(grid, b.position)
  );
}
