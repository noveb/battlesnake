import { shuffle } from 'lodash';
import Board from './Board';
import Snake from './Snake';
import {
  Directions, GameStatus, Move,
} from '../../shared/types';
import logger from '../../logger';

export default class Strategy {
  board: Board;

  me: Snake;

  snakes: Snake[];

  longestSnake: number;

  turn: number;

  constructor(game: GameStatus) {
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

      if (Strategy.isDesperatePosition(directions)) {
        return { move: 'suicide' };
      }
      const {
        foodMoves,
        otherMoves,
      } = Strategy.findPossibleMoves(directions);

      const moves = [...shuffle(foodMoves), ...shuffle(otherMoves)];
      logger.debug(JSON.stringify(moves));
      return moves[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  static findPossibleMoves(directions: Directions) {
    const otherMoves: Move[] = [];
    const foodMoves: Move[] = [];

    Object.keys(directions).forEach((key: string) => {
      if (!directions[key as keyof Directions].snake
        && !directions[key as keyof Directions].wall) {
        if (directions[key as keyof Directions].food) {
          foodMoves.push({ move: key });
        } else {
          otherMoves.push({ move: key });
        }
      }
    });
    return { foodMoves, otherMoves };
  }

  static isDesperatePosition(directions: Directions): boolean {
    if (
      (directions.left.snake || directions.left.wall)
        && (directions.right.snake || directions.right.wall)
        && (directions.up.snake || directions.up.wall)
        && (directions.down.snake || directions.down.wall)
    ) {
      return true;
    }
    return false;
  }
}
