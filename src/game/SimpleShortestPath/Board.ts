import { Logger } from 'winston';
import {
  Coordinate, IBoard, ISnake,
} from '../../shared/types';

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
}
