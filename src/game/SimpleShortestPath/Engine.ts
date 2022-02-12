import type { Logger } from 'winston';
import type { Engine, GameStatus, Move } from '../../shared/types';
import Strategy from './Strategy';

export default class SspEngine implements Engine {
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
      const gameInfoLog = `game: ${this.game.game.id.split('-')[0]}, turn: ${this.game.turn}`;
      let move: Move;

      if (move === undefined) {
        move = this.strategy.nextMoveFood(true);
        this.logger.info(`${gameInfoLog}, SSP food defensive ${JSON.stringify(move)}`);
      }
      if (move === undefined) {
        move = this.strategy.nextMoveTail(true);
        this.logger.info(`${gameInfoLog}, SSP tail defensive ${JSON.stringify(move)}`);
      }
      if (move === undefined) {
        move = this.strategy.nextMoveFood(false);
        this.logger.info(`${gameInfoLog}, SSP food ${JSON.stringify(move)}`);
      }
      if (move === undefined) {
        move = this.strategy.nextMoveTail(false);
        this.logger.info(`${gameInfoLog}, SSP tail ${JSON.stringify(move)}`);
      }

      return move;
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }
}
