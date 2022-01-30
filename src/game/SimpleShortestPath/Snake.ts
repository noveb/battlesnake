import { Logger } from 'winston';
import { ISnake, Coordinate, Directions } from '../types';

export default class Snake implements ISnake {
  logger: Logger;

  id: string;

  name: string;

  health: number;

  body: Coordinate[];

  latency: string;

  head: Coordinate;

  tail: Coordinate;

  length: number;

  shout: string;

  squad: string;

  customizations: {
    color: string,
    head: string,
    tail: string
  };

  constructor(snake: ISnake, logger: Logger) {
    this.logger = logger;
    this.id = snake.id;
    this.name = snake.name;
    this.health = snake.health;
    this.body = snake.body;
    this.latency = snake.latency;
    this.head = snake.head;
    [this.tail] = this.body.slice(-1);
    this.length = snake.length;
    this.shout = snake.shout;
    this.squad = snake.squad;
    this.customizations = snake.customizations;
  }

  checkMoves(directions: Directions) {
    const newDirections: Directions = { ...directions };
    try {
      Object.keys(directions).forEach((key: string) => {
        if (this.isSnake(directions[key as keyof Directions])) {
          newDirections[key as keyof Directions].snake = true;
        }
      });
      return newDirections;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  isSnake(coord: Coordinate) {
    try {
      const snakeBody = this.body.find((element) => {
        if (element.x === coord.x && element.y === coord.y) {
          return true;
        }
        return false;
      });
      return !!snakeBody;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  possibleMoves() {
    try {
      const head = this.body[0];
      const stati = { snake: false, wall: false, food: false };
      const directions: Directions = {
        right: { x: head.x + 1, y: head.y, ...stati },
        left: { x: head.x - 1, y: head.y, ...stati },
        up: { x: head.x, y: head.y - 1, ...stati },
        down: { x: head.x, y: head.y + 1, ...stati },
      };
      return directions;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  getDistanceHeadTail() {
    try {
      const dx = this.head.x - this.tail.x;
      const dy = this.head.y - this.tail.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      return d;
    } catch (error) {
      this.logger.error(error);
      // return minimal possible distance
      return 0;
    }
  }
}
