class Snake {
    constructor(snake) {
        this.id = snake.id;
        this.name = snake.name;
        this.health = snake.health;
        this.body = snake.body;
        console.log('SNAKE :: OK');
    }

    checkMoves(directions) {
        try {
            for (const key of Object.keys(directions)) {
                if (this.isSnake(directions[key])) {
                    directions[key].snake = true;
                }
            }
            return directions;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    isSnake(coord = { x: Number, y: Number }) {
        let isSnake = false;
        isSnake = this.body.find((element) => {
            if (element.x === coord.x && element.y === coord.y) {
                return true;
            }
            return false;
        });
        return isSnake;
    }

    possibleMoves() {
        try {
            const head = this.body[0];
            const stati = { snake: false, wall: false, food: false };
            const directions = {};
            directions.right = { x: head.x + 1, y: head.y, ...stati };
            directions.left = { x: head.x - 1, y: head.y, ...stati };
            directions.up = { x: head.x, y: head.y - 1, ...stati };
            directions.down = { x: head.x, y: head.y + 1, ...stati };
            return directions;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}
exports.Snake = Snake;
