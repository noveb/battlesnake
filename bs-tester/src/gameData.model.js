const mongoose = require('mongoose');

const gameDataSchema = new mongoose.Schema({
    game: {
        id: String,
    },
    turn: Number,
    board: {
        height: Number,
        width: Number,
        food: [{
            x: Number,
            y: Number,
        }],
        snakes: [{
            id: String,
            name: String,
            health: Number,
            body: [{
                x: Number,
                y: Number,
            }],
        }],
    },
    you: {
        id: String,
        name: String,
        health: Number,
        body: [{
            x: Number,
            y: Number,
        }],
    },
});

const GameData = mongoose.model('GameData', gameDataSchema);

module.exports = GameData;
