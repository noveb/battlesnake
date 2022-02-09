import logger from '../logger';
import Controller from './Controller';
import { GameStatus } from '../database';

const controller = new Controller(logger, GameStatus);

export default controller;
