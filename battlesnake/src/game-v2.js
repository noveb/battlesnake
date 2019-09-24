const pathFinder = require('pathfinding');
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
        console.log('GAME :: OK');
    }

    nextMoveFood() {
        try {
            const unwalkables = this.getAllUnwalkables();
            console.log(unwalkables);
            const grid = this.initGrid(unwalkables);
            let path = new Array(999999);
            const aStar = new pathFinder.AStarFinder();
            for (const food of this.board.food) {
                const workingGrid = grid.clone();
                const workingPath = aStar.findPath(
                    this.me.body[0].x,
                    this.me.body[0].y,
                    food.x, food.y, workingGrid,
                );
                if (workingPath.length > 0 && workingPath.length < path.length) {
                    path = workingPath;
                }
            }
            const direction = this.getDirectionFromCoords(
                this.me.body[0],
                { x: path[1][0], y: path[1][1] },
            );
            console.log(direction);
            return direction;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }

    nextMoveTail() {}

    // eslint-disable-next-line class-methods-use-this
    getDirectionFromCoords(start, goal) {
        try {
            if (goal.x > start.x) return { move: 'right' };
            if (goal.x < start.x) return { move: 'left' };
            if (goal.y > start.y) return { move: 'down' };
            if (goal.y < start.y) return { move: 'up' };
            return undefined;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    initGrid(unwalkables) {
        const grid = new pathFinder.Grid(this.board.width, this.board.height);
        for (const field of unwalkables) {
            grid.setWalkableAt(field.x, field.y, false);
        }
        return grid;
    }

    getAllUnwalkables() {
        try {
            let unwalkables = [];
            unwalkables = unwalkables.concat(this.me.body);
            console.log(unwalkables);
            for (const snake of this.snakes) {
                unwalkables = unwalkables.concat(snake.body);
            }
            console.log(unwalkables);

            return unwalkables;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Game;
