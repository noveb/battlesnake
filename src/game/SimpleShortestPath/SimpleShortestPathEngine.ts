import type { Logger } from 'winston';
import type { Engine, GameStatus, Move } from '../types';
import Strategy from './SimpleShortestPathStrategy';

export default class SimpleShortestPathEngine implements Engine {
  logger: Logger;

  game: GameStatus;

  strategy: any;

  constructor(game: GameStatus, logger: Logger) {
    this.logger = logger;
    this.game = game;
    this.strategy = new Strategy(this.game, this.logger);
  }

  move() {
    try {
      let move: Move;

      if (move === undefined) {
        move = this.strategy.nextMoveFood(true);
        this.logger.info(`Turn: ${this.game.turn}: myGame2.nextMoveFood: avoidSnakes`, move);
      }
      if (move === undefined) {
        move = this.strategy.nextMoveTail(true);
        this.logger.info(`Turn: ${this.game.turn}: myGame2.nextMoveTail avoidSnakes: `, move);
      }
      if (move === undefined) {
        move = this.strategy.nextMoveFood(false);
        this.logger.info(`Turn: ${this.game.turn}: myGame2.nextMoveFood: avoidSnakes`, move);
      }
      if (move === undefined) {
        move = this.strategy.nextMoveTail(false);
        this.logger.info(`Turn: ${this.game.turn}: myGame2.nextMoveTail avoidSnakes: `, move);
      }
      if (move === undefined) {
        move = this.strategy.nextMoveRandom();
        this.logger.info(`Turn: ${this.game.turn}: myGame1.nextMoveRandom: `, move);
      }

      return move;
    } catch (error) {
      this.logger.error(error);
      return { move: 'left' };
    }
  }
}
