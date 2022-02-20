import * as bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import type { Request, Response } from 'express';
// import path from 'node:path';
import logger from './logger';
import {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
} from './handlers';
import gameController from './game';
// import replayController from './replay';
import { db } from './database';

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
// app.set('view engine', 'pug');
// app.use(express.static(path.join(`${__dirname}/src/views`)));
// app.set('views', './src/views');

app.use(gameController.router);
// app.use('/replay', replayController.router);
app.get('/health', (req: Request, res: Response) => {
  if (db.readyState !== 1) {
    return res.status(500).json({
      api: 'ready',
      database: 'faulty',
    });
  }
  return res.status(200).json({
    api: 'ready',
    database: 'ready',
  });
});
app.use('*', fallbackHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);

app.listen(app.get('port'), () => {
  logger.info(`Server listening on port ${app.get('port')}`);
});
