class Board {
    constructor(board) {
        this.height = board.height;
        this.width = board.width;
        this.food = board.food;
        console.log('BOARD :: OK');
    }

    checkMoves(directions) {
        try {
            for (const key of Object.keys(directions)) {
                if (this.isWall(directions[key])) {
                    directions[key].wall = true;
                }
                if (this.isFood(directions[key])) {
                    directions[key].food = true;
                }
            }
            return directions;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    isWall(coord = { x: Number, y: Number }) {
        if (coord.x >= this.width || coord.x < 0) {
            return true;
        }
        if (coord.y >= this.height || coord.y < 0) {
            return true;
        }
        return false;
    }

    isFood(coord = { x: Number, y: Number }) {
        let isFood = false;
        isFood = this.food.find((element) => {
            if (element.x === coord.x && element.y === coord.y) {
                return true;
            }
        });
        return isFood;
    }
}
exports.Board = Board;
