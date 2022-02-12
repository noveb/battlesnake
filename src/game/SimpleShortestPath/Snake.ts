import { Logger } from 'winston';
import { ISnake, Coordinate } from '../../shared/types';

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
