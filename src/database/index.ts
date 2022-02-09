import mongoose from 'mongoose';

const gameStatusSchema = new mongoose.Schema({}, { strict: false });

export const GameStatus = mongoose.model('gameStatus', gameStatusSchema);

mongoose.connect('mongodb://mongo:27017/battlesnake');

export const db = mongoose.connection;
