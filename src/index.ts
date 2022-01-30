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
import logger from './logger';

const MoveController = require('./move.controller');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(morgan('dev'));
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

app.get('/health', (req: Request, res: Response) => res.sendStatus(200));

app.post('/start', (req: Request, res: Response) => res.sendStatus(200));

app.post('/move', (req: Request, res: Response) => {
  const move = new MoveController(req, res, logger);
  move.move();
});

app.post('/end', (req: Request, res: Response) => res.sendStatus(200));

app.post('/ping', (req: Request, res: Response) => res.json({}));

app.use('*', fallbackHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);

app.listen(app.get('port'), () => {
  logger.info(`Server listening on port ${app.get('port')}`);
});
