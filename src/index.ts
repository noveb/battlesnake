import * as bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import type { Request, Response } from 'express';
import {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
  poweredByHandler,
} from './handlers';

const MoveController = require('./move.controller');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.enable('verbose errors');

const loggerEnv : string = process.env.NODE_ENV === 'production'
  ? 'dev'
  : 'dev';
app.use(morgan(loggerEnv));
app.use(bodyParser.json());
app.use(poweredByHandler);

app.get('/', (req: Request, res: Response) => res.json(
  {
    apiversion: '1',
    author: 'noveb',
    color: '#111111',
    head: 'pixel',
    tail: 'pixel',
    version: '0.3.3',
  },
));

// Handle POST req to '/start'
app.post('/start', (req: Request, res: Response) => res.sendStatus(200));

// Handle POST req to '/move'
app.post('/move', (req: Request, res: Response) => {
  // const game = new GameData(req.body);
  // game.save().then().catch((error) => console.error(error));

  const move = new MoveController(req, res);
  move.move();
});

// eslint-disable-next-line arrow-body-style
app.post('/end', (req: Request, res: Response) => {
  // NOTE: Any cleanup when a game is complete.
  return res.sendStatus(200);
});

app.post('/ping', (req: Request, res: Response) => res.json({}));

// --- SNAKE LOGIC GOES ABOVE THIS LINE ---

app.use('*', fallbackHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'));
});
