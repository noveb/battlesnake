import { Logger } from 'winston';
import { shuffle } from 'lodash';
import Board from './Board';
import Snake from './Snake';
import {
  Directions, GameStatus,
} from '../../shared/types';

export default class Strategy {
  logger: Logger;

  board: Board;

  me: Snake;

  snakes: Snake[];

  longestSnake: number;

  turn: number;

  constructor(game: GameStatus, logger: Logger) {
    this.logger = logger;
    this.board = new Board(game.board);
    this.me = new Snake(game.you);
    this.snakes = [];
    this.longestSnake = 0;
    this.turn = game.turn;
  }

  nextMoveRandom() {
    try {
      let directions = this.me.possibleMoves();
      directions = this.board.checkMoves(directions);

      if (
        (directions.left.snake || directions.left.wall)
          && (directions.right.snake || directions.right.wall)
          && (directions.up.snake || directions.up.wall)
          && (directions.down.snake || directions.down.wall)
      ) {
        return { move: 'death' };
      }

      const allMoves: any = [];
      const foodMoves: any = [];

      Object.keys(directions).forEach((key: string) => {
        if (
          !directions[key as keyof Directions].snake
          && !directions[key as keyof Directions].wall
        ) {
          if (directions[key as keyof Directions].food) {
            foodMoves.push({ move: key });
          }
          allMoves.push({ move: key });
        }
      });

      const moves = [...shuffle(foodMoves), ...shuffle(allMoves)];
      this.logger.debug(JSON.stringify(moves));
      return moves.shift();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
