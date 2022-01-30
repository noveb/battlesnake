import type { Request, Response } from 'express';
import type { Logger } from 'winston';
import { Router } from 'express';
import type { ApiDetails, Move } from './types';
import SSPEngine from './SimpleShortestPath/SimpleShortestPathEngine';

class Controller {
  public router = Router();

  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
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
      color: '#111111',
      head: 'pixel',
      tail: 'pixel',
      version: '0.4.0',
    };
    return res.status(200).json(apiDetails);
  };

  private static start = (req: Request, res: Response) => res.sendStatus(200);

  private move = (req: Request, res: Response) => {
    const sspEngine = new SSPEngine(req.body, this.logger);
    const move: Move = sspEngine.move();
    return res.status(200).json(move);
  };

  private static end = (req: Request, res: Response) => res.sendStatus(200);

  private static ping = (req: Request, res: Response) => res.status(200).json({});
}
export default Controller;
