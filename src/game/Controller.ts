import type { Request, Response } from 'express';
import type { Logger } from 'winston';
import { Router } from 'express';
import { createHash } from 'crypto';
import type { ApiDetails, GameStatus, Move } from '../shared/types';
import SspEngine from './SimpleShortestPath';
import RandomEngine from './Random';

class Controller {
  public router = Router();

  constructor(private logger: Logger, private GameStatus: any) {
    this.router.get('/', Controller.root);
    this.router.post('/start', Controller.start);
    this.router.post('/move', this.move);
    this.router.post('/end', Controller.end);
    this.router.post('/ping', Controller.ping);
  }

  private static root = (req: Request, res: Response) => {
    const apiDetails: ApiDetails = {
      apiversion: '1',
      author: 'noveb',
      color: '#000000',
      head: 'pixel',
      tail: 'pixel',
      version: '0.4.0',
    };
    return res.status(200).json(apiDetails);
  };

  private static start = (req: Request, res: Response) => res.sendStatus(200);

  private move = (req: Request, res: Response) => {
    const { hash, timestamp } = this.saveGame(req.body);
    this.logger.info(`game: ${req.body.game.id.split('-')[0]}, turn: ${req.body.turn}, hash: ${hash.substring(0, 10)}, timestamp: ${timestamp}`);

    const sspEngine = new SspEngine(req.body, this.logger);
    let move: Move = sspEngine.move();
    if (!move) {
      const randomEngine = new RandomEngine(req.body, this.logger);
      move = randomEngine.move();
    }

    return res.status(200).json(move);
  };

  saveGame(gameStatus: GameStatus): { hash: String, timestamp: number } {
    const hash = createHash('md5').update(JSON.stringify(gameStatus)).digest('hex');
    const timestamp = Date.now();
    const game = new this.GameStatus({
      gameId: gameStatus.game.id,
      timestamp,
      hash,
      gameStatus,
    });
    game.save().then().catch((error: Error) => this.logger.error(error));
    return { hash, timestamp };
  }

  private static end = (req: Request, res: Response) => res.sendStatus(200);

  private static ping = (req: Request, res: Response) => res.status(200).json({});
}
export default Controller;
