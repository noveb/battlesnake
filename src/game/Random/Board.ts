import logger from '../../logger';
import {
  Coordinate, Directions, IBoard, ISnake,
} from '../../shared/types';

export default class Board implements IBoard {
  height: number;

  width: number;

  snakes: ISnake[];

  food: Coordinate[];

  hazards: Coordinate[];

  constructor(board: IBoard) {
    this.height = board.height;
    this.width = board.width;
    this.snakes = board.snakes;
    this.food = board.food;
    this.hazards = board.hazards;
  }

  checkMoves(directions: Directions) {
    let validDirections: Directions = this.checkWall(directions);
    validDirections = this.checkSnakes(validDirections);
    validDirections = this.checkFood(validDirections);
    return validDirections;
  }

  static compareCoordinates = (first: Coordinate, second: Coordinate): boolean => {
    if (first.x === second.x && first.y === second.y) {
      return true;
    }
    return false;
  };

  checkSnakes(directions: Directions): Directions {
    const validDirections: Directions = {
      up: { ...directions.up, snake: false },
      down: { ...directions.down, snake: false },
      left: { ...directions.left, snake: false },
      right: { ...directions.right, snake: false },
    };
    this.snakes.forEach((snake: ISnake) => {
      snake.body.forEach((bodyPart: Coordinate, index, { length }) => {
        Object.keys(validDirections).forEach((key: string) => {
          if (Board.compareCoordinates(validDirections[key as keyof Directions], bodyPart)
          && index < length - 1
          ) {
            logger.debug(`index: ${index}, length: ${length}`);
            validDirections[key as keyof Directions].snake = true;
          }
        });
      });
    });
    return validDirections;
  }

  checkFood(directions: Directions): Directions {
    const validDirections: Directions = {
      up: { ...directions.up, food: false },
      down: { ...directions.down, food: false },
      left: { ...directions.left, food: false },
      right: { ...directions.right, food: false },
    };
    this.food.forEach((food: Coordinate) => {
      if (Board.compareCoordinates(validDirections.up, food)) {
        validDirections.up.food = true;
      }
      if (Board.compareCoordinates(validDirections.down, food)) {
        validDirections.down.food = true;
      }
      if (Board.compareCoordinates(validDirections.left, food)) {
        validDirections.left.food = true;
      }
      if (Board.compareCoordinates(validDirections.right, food)) {
        validDirections.right.food = true;
      }
    });
    return validDirections;
  }

  checkWall(directions: Directions): Directions {
    const validDirections: Directions = {
      up: { ...directions.up, wall: true },
      down: { ...directions.down, wall: true },
      left: { ...directions.left, wall: true },
      right: { ...directions.right, wall: true },
    };
    validDirections.down.wall = this.isWall(validDirections.down);
    validDirections.up.wall = this.isWall(validDirections.up);
    validDirections.left.wall = this.isWall(validDirections.left);
    validDirections.right.wall = this.isWall(validDirections.right);
    return validDirections;
  }

  isWall(coord: Coordinate): boolean {
    if (
      coord.x >= this.width
      || coord.x < 0
      || coord.y >= this.height
      || coord.y < 0
    ) {
      return true;
    }
    return false;
  }
}
