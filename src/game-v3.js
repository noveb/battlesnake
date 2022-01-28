const pathFinder = require('pathfinding');

class Game {
    constructor(game) {
        this.board = game.board;
        this.me = game.you;
        this.grid = undefined;
    }

    calcPathFromFoodToMe() {
        const unwalkables = this.getAllUnwalkables();
        unwalkables[this.me.body[0].y][this.me.body[0].x] = 0;
        const grid = new pathFinder.Grid(unwalkables);
        const aStar = new pathFinder.AStarFinder({
            heuristic: pathFinder.Heuristic.manhattan,
        });

        const paths = [];
        for (const food of this.board.food) {
            const tmpGrid = grid.clone();
            const tmpPath = aStar.findPath(
                food.x, food.y,
                this.me.body[0].x,
                this.me.body[0].y,
                tmpGrid,
            );
            paths.push(tmpPath);
        }
        const lengths = paths.map((path) => path.length);
        const shortest = lengths.lastIndexOf(Math.min.apply(null, lengths));
        return this.getDirectionFromCoords(
            this.me.body[0],
            { x: paths[shortest][0][0], y: paths[shortest][0][1] },
        );
    }


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

    getAllUnwalkables() {
        try {
            const bodies = this.board.snakes.map((snake) => snake.body)
                .reduce((all, val) => all.concat(val), []);

            const row = [];
            for (let i = 0; i < this.board.height; ++i) {
                const col = [];
                for (let j = 0; j < this.board.width; ++j) {
                    const blocked = bodies.some((item) => item.x === j && item.y === i);
                    col[j] = blocked ? 1 : 0;
                }
                row[i] = col;
            }
            return row;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Game;
