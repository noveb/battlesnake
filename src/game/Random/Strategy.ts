import { shuffle } from 'lodash';
import Board from './Board';
import Snake from './Snake';
import {
  Coordinate, Directions, GameStatus, Move, Ruleset,
} from '../../shared/types';
import logger from '../../logger';
import { floodFill, initBoard } from '../FloodFill/floodFill';

export default class Strategy {
  board: Board;

  me: Snake;

  snakes: Snake[];

  longestSnake: number;

  turn: number;

  ruleset: Ruleset;

  constructor(game: GameStatus) {
    this.board = new Board(game.board);
    this.me = new Snake(game.you);
    this.snakes = [];
    this.longestSnake = 0;
    this.turn = game.turn;
    this.ruleset = game.game.ruleset;
  }

  nextMoveRandom() {
    try {
      let directions = this.me.possibleMoves(
        this.ruleset.name,
        this.board.height,
        this.board.width,
      );
      directions = this.board.checkMoves(directions);

      if (Strategy.isDesperatePosition(directions)) {
        return undefined;
      }
      const {
        foodMoves,
        otherMoves,
      } = Strategy.findPossibleMoves(directions);

      const moves = [...shuffle(foodMoves), ...shuffle(otherMoves)];
      return moves[0];
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  moveOpenSpace() {
    let directions = this.me.possibleMoves();
    directions = this.board.checkMoves(directions);

    if (Strategy.isDesperatePosition(directions)) {
      return undefined;
    }

    const snakeBodies = this.board.snakes.flatMap((snake) => snake.body);

    const possibleMoves = Object.values(directions).filter((move) => !(move.snake || move.wall));

    // eslint-disable-next-line no-restricted-syntax
    for (const move of possibleMoves) {
      if (
        !(move.snake || move.wall)
      ) {
        const workingBoard = initBoard(this.board.height, this.board.width, snakeBodies);
        const ffResult = floodFill(
          workingBoard,
          move.x,
          move.y,
        );
        move.openSpace = ffResult.reachableCounter;
      }
    }

    const maxOpenSpace: Number = possibleMoves.reduce((prev, current) => {
      if (prev.openSpace && current.openSpace && prev.openSpace > current.openSpace) {
        return prev;
      }
      return current;
    }).openSpace || 0;
    const bestMoves = possibleMoves.filter(
      (move) => move.openSpace && move.openSpace >= maxOpenSpace,
    );

    const shuffledMoves = shuffle(bestMoves);

    return Strategy.getDirectionFromCoords(this.me.head, shuffledMoves[0]);
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

  static getDirectionFromCoords(start: Coordinate, goal: Coordinate) {
    if (goal.x > start.x) return { move: 'right' };
    if (goal.x < start.x) return { move: 'left' };
    if (goal.y < start.y) return { move: 'down' };
    if (goal.y > start.y) return { move: 'up' };
    return undefined;
  }
}
