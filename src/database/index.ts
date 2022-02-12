import mongoose from 'mongoose';

const gameStatusSchema = new mongoose.Schema({
  gameId: String,
  timestamp: { type: Number, default: Date.now() },
  hash: String,
  gameStatus: {},
}, { strict: false });

export const GameStatus = mongoose.model('gameStatus', gameStatusSchema);

mongoose.connect('mongodb://mongo:27017/battlesnake');

export const db = mongoose.connection;
