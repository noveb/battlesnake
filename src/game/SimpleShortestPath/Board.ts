import { Logger } from 'winston';
import {
  Coordinate, Directions, IBoard, ISnake,
} from '../types';

export default class Board implements IBoard {
  logger: Logger;

  height: number;

  width: number;

  snakes: ISnake[];

  food: Coordinate[];

  hazards: Coordinate[];

  constructor(board: IBoard, logger: Logger) {
    this.logger = logger;
    this.height = board.height;
    this.width = board.width;
    this.snakes = board.snakes;
    this.food = board.food;
    this.hazards = board.hazards;
  }

  checkMoves(directions: Directions) {
    const newDirections: Directions = { ...directions };
    try {
      Object.keys(directions).forEach((key) => {
        if (this.isWall(directions[key as keyof Directions])) {
          newDirections[key as keyof Directions].wall = true;
        }
        if (this.isFood(directions[key as keyof Directions])) {
          newDirections[key as keyof Directions].food = true;
        }
      });
      return newDirections;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  isWall(coord: Coordinate) {
    if (coord.x >= this.width || coord.x < 0) {
      return true;
    }
    if (coord.y >= this.height || coord.y < 0) {
      return true;
    }
    return false;
  }

  isFood(coord: Coordinate) {
    const snakeBody = this.food.find((element) => {
      if (element.x === coord.x && element.y === coord.y) {
        return true;
      }
      return false;
    });
    return !!snakeBody;
  }
}
