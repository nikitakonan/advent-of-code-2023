export const SPACE = '.';
export const MIRROR_RIGHT = '/';
export const MIRROR_LEFT = '\\';
export const SPLITTER_VERTICAL = '|';
export const SPLITTER_HORIZONTAL = '-';

export type GridItem =
  | typeof SPACE
  | typeof MIRROR_LEFT
  | typeof MIRROR_RIGHT
  | typeof SPLITTER_HORIZONTAL
  | typeof SPLITTER_VERTICAL;

export type Grid = GridItem[][];

export type Position = [number, number];

export enum Direction {
  Left,
  Right,
  Up,
  Down,
}

export class Beam {
  inputDirection: Direction;
  position: Position;
  constructor(direction: Direction, position: Position) {
    this.inputDirection = direction;
    this.position = position;
  }
  getId() {
    return `${this.inputDirection}-${this.position.toString()}`;
  }
}

export interface BeamGetter {
  [SPACE]: (beam: Beam) => Beam[];
  [MIRROR_RIGHT]: (beam: Beam) => Beam[];
  [MIRROR_LEFT]: (beam: Beam) => Beam[];
  [SPLITTER_HORIZONTAL]: (beam: Beam) => Beam[];
  [SPLITTER_VERTICAL]: (beam: Beam) => Beam[];
}
