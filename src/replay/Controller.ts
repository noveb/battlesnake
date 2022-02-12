import type { Request, Response } from 'express';
import type { Logger } from 'winston';
import { Router } from 'express';

class Controller {
  public router = Router();

  constructor(private logger: Logger, private GameStatus: any) {
    this.router.get('/', this.getUi);
    // this.router.get('/game', Controller.getGameList);
    // this.router.get('/game/:gameId', Controller.getOneGameById);
    // this.router.get('/game/:gameId/turn/:turnId', Controller.getOneTurnByIdAndGame);
    // this.router.post('/game/:gameId/turn/:turnId', Controller.replayOneTurnByIdAndGame);
  }

  private getUi = async (req: Request, res: Response) => {
    const games = await this.GameStatus.findOne({});
    return res.render('index.pug', {
      title: 'hello',
      headline1: 'World!',
      games: JSON.stringify(games, null, 2),
    });
  };
}
export default Controller;
