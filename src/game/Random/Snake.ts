import logger from '../../logger';
import { ISnake, Coordinate, Directions } from '../../shared/types';

export default class Snake implements ISnake {
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

  constructor(snake: ISnake) {
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

  possibleMoves(rulesetName?: string, boardHeight?: number, boardWidth?: number) {
    try {
      const head = this.body[0];
      const stati = {
        snake: false, wall: false, food: false, openSpace: 0,
      };

      const wrapAround = (x: number, d: number): number => {
        if (x < 0) return d - 1;
        if (x === d) return 0;
        return x;
      };
      let directions: Directions;
      if (rulesetName === 'wrapped' && boardHeight && boardWidth) {
        directions = {
          right: {
            x: wrapAround(head.x + 1, boardWidth),
            y: wrapAround(head.y, boardHeight),
            ...stati,
          },
          left: {
            x: wrapAround(head.x - 1, boardWidth),
            y: wrapAround(head.y, boardHeight),
            ...stati,
          },
          up: {
            x: wrapAround(head.x, boardWidth),
            y: wrapAround(head.y + 1, boardHeight),
            ...stati,
          },
          down: {
            x: wrapAround(head.x, boardWidth),
            y: wrapAround(head.y - 1, boardHeight),
            ...stati,
          },
        };
      } else {
        directions = {
          right: { x: head.x + 1, y: head.y, ...stati },
          left: { x: head.x - 1, y: head.y, ...stati },
          up: { x: head.x, y: head.y + 1, ...stati },
          down: { x: head.x, y: head.y - 1, ...stati },
        };
      }
      return directions;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
