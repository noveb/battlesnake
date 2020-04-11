const { Board } = require('./Board');
const { Snake } = require('./Snake');

class Game {
    constructor(game) {
        this.board = new Board(game.board);
        this.me = new Snake(game.you);
        this.snakes = [];
        for (const snake of game.board.snakes) {
            this.snakes.push(new Snake(snake));
        }
    }

    nextMoveFood() {
        const directions = this.getDirections();

        if (directions.left.food
            && !directions.left.snake
            && !directions.left.wall) {
            return { move: 'left' };
        }
        if (directions.right.food
            && !directions.right.snake
            && !directions.right.wall) {
            return { move: 'right' };
        }
        if (directions.up.food
            && !directions.up.snake
            && !directions.up.wall) {
            return { move: 'up' };
        }
        if (directions.down.food
            && !directions.down.snake
            && !directions.down.wall) {
            return { move: 'down' };
        }
        return this.nextMoveRandom();
    }

    nextMoveRandom() {
        try {
            const directions = this.getDirections();

            const random = Math.floor(Math.random() * 4);
            if (random === 0
                && !directions.left.snake
                && !directions.left.wall) {
                return { move: 'left' };
            }
            if (random === 1
                && !directions.right.snake
                && !directions.right.wall) {
                return { move: 'right' };
            }
            if (random === 2
                && !directions.up.snake
                && !directions.up.wall) {
                return { move: 'up' };
            }
            if (random === 3
                && !directions.down.snake
                && !directions.down.wall) {
                return { move: 'down' };
            }
            if (
                (directions.left.snake || directions.left.wall)
                && (directions.right.snake || directions.right.wall)
                && (directions.up.snake || directions.up.wall)
                && (directions.down.snake || directions.down.wall)
            ) {
                return { move: 'death' };
            }
            return this.nextMoveRandom();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getDirections() {
        try {
            let directions = this.me.possibleMoves();
            directions = this.me.checkMoves(directions);
            for (const snake of this.snakes) {
                directions = snake.checkMoves(directions);
            }
            directions = this.board.checkMoves(directions);

            return directions;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Game;
