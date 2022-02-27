import type { Logger } from 'winston';

export type ApiDetails = {
  apiversion: string,
  author?: string,
  color?: string,
  head?: string,
  tail?: string,
  version?: string,
};

export type Move = {
  move: string;
  id?: string;
} | undefined;

export interface Engine {
  logger: Logger,
  game: any,
  strategy: any,
  move: () => Move
}

export type GameStatus = {
  game: Game,
  turn: number,
  board: IBoard,
  you: ISnake
};

export type Game = {
  id: string,
  ruleset: Ruleset,
  timeout: number,
  source: string,
};

export type Ruleset = {
  name: string,
  version: string,
  settings: RulesetSettings
};

export type RulesetSettings = {
  foodSpawnChance: number,
  minimumFood: number,
  hazardDamagePerTurn: number,
  map?: string,
  shrinkEveryNTurns?: number,
  allowBodyCollisions?: boolean,
  sharedElimination?: boolean,
  sharedHealth?: boolean,
  sharedLength?: boolean
};

export interface ISnake {
  id: string,
  name: string,
  health: number,
  body: Coordinate[],
  latency: string,
  head: Coordinate,
  length: number,
  shout: string,
  squad: string,
  customizations: {
    color: string,
    head: string,
    tail: string
  },
  eliminated?: boolean
}

export type Coordinate = {
  x: number,
  y: number,
  snake?: boolean,
  wall?: boolean,
  food?: boolean,
  openSpace?: number
};

export interface IBoard {
  height: number,
  width: number,
  food: Coordinate[],
  hazards: Coordinate[],
  snakes: ISnake[],
}

export type Directions = {
  left: Coordinate,
  right: Coordinate,
  up: Coordinate,
  down: Coordinate,
};
