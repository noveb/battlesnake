import type { Logger } from 'winston';
import type { Engine, GameStatus, Move } from '../../shared/types';
import Strategy from './Strategy';

export default class RandomEngine implements Engine {
  logger: Logger;

  game: GameStatus;

  strategy: any;

  constructor(game: GameStatus, logger: Logger) {
    this.logger = logger;
    this.game = game;
    this.strategy = new Strategy(this.game);
  }

  move() {
    try {
      const gameInfoLog = `game: ${this.game.game.id.split('-')[0]}, turn: ${this.game.turn}`;

      const move: Move = this.strategy.nextMoveRandom();
      this.logger.info(`${gameInfoLog}, Random food ${JSON.stringify(move)}`);

      return move;
    } catch (error) {
      this.logger.error(error);
      return { move: 'left' };
    }
  }
}
