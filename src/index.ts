import * as bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import type { Request, Response } from 'express';
import logger from './logger';

import {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
} from './handlers';
import gameController from './game';

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(gameController.router);
app.get('/health', (req: Request, res: Response) => res.sendStatus(200));

app.use('*', fallbackHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);

app.listen(app.get('port'), () => {
  logger.info(`Server listening on port ${app.get('port')}`);
});
