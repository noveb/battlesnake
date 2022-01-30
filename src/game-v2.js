const pathFinder = require('pathfinding');
const { Board } = require('./Board');
const { Snake } = require('./Snake');

class Game {
  constructor(game, logger) {
    this.logger = logger;
    this.board = new Board(game.board);
    this.me = new Snake(game.you);
    this.snakes = [];
    this.longestSnake = 0;
    this.turn = game.turn;
    this.initSnakes(game.board.snakes);
  }

  initSnakes(snakes) {
    snakes.forEach((snake) => {
      if (snake.name === this.me.name) {
        return;
      }
      this.snakes.push(new Snake(snake));
      if (snake.body.length > this.longestSnake) {
        this.longestSnake = snake.body.length;
      }
    });
  }

  nextMoveFood(avoidSnakes = true) {
    try {
      const unwalkables = this.getAllUnwalkables(true, avoidSnakes);
      const grid = this.initGrid(unwalkables);
      let path = new Array(999999);
      const aStar = new pathFinder.AStarFinder({
        heuristic: pathFinder.Heuristic.manhattan,
      });
      this.board.food.forEach((food) => {
        const workingGrid = grid.clone();
        const workingPath = aStar.findPath(
          this.me.head.x,
          this.me.head.y,
          food.x,
          food.y,
          workingGrid,
        );
        const canEscape = this.existsEscapePath(food, this.me.tail, grid.clone());
        if (workingPath.length > 0
                    && canEscape === true
                    && workingPath.length < path.length) {
          path = workingPath;
        }
      });
      if (path[1] === undefined) return undefined;
      const direction = this.getDirectionFromCoords(
        this.me.head,
        { x: path[1][0], y: path[1][1] },
      );
      return direction;
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }

  existsEscapePath(start, end, grid) {
    try {
      const toTailGrid = grid.clone();
      toTailGrid.setWalkableAt(end.x, end.y, true);
      const aStar = new pathFinder.AStarFinder({
        heuristic: pathFinder.Heuristic.manhattan,
      });
      const toTail = aStar.findPath(
        start.x,
        start.y,
        end.x,
        end.y,
        toTailGrid,
      );
      if (toTail.length > 0) return true;

      const pathsToCorners = [];
      for (let i = 0; i <= this.board.width; i += (this.board.width - 1)) {
        for (let j = 0; j <= this.board.height; j += (this.board.height - 1)) {
          const cornerGrid = grid.clone();
          const pathToCorner = aStar.findPath(
            start.x,
            start.y,
            i,
            j,
            cornerGrid,
          );
          if (pathToCorner.length > 0) {
            pathsToCorners.push(pathToCorner);
          }
        }
      }
      if (pathsToCorners.length >= 2) return true;
      return false;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }

  nextMoveTail(avoidSnakes = true) {
    try {
      const unwalkables = this.getAllUnwalkables(true, avoidSnakes);
      const grid = this.initGrid(unwalkables);
      const aStar = new pathFinder.AStarFinder({
        heuristic: pathFinder.Heuristic.manhattan,
      });
      const path = aStar.findPath(
        this.me.head.x,
        this.me.head.y,
        this.me.tail.x,
        this.me.tail.y,
        grid,
      );
      if (path.length <= 1) {
        return undefined;
      }
      const direction = this.getDirectionFromCoords(
        this.me.head,
        { x: path[1][0], y: path[1][1] },
      );
      return direction;
    } catch (error) {
      this.logger.error(error);
      return undefined;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getDirectionFromCoords(start, goal) {
    try {
      if (goal.x > start.x) return { move: 'right' };
      if (goal.x < start.x) return { move: 'left' };
      if (goal.y < start.y) return { move: 'down' };
      if (goal.y > start.y) return { move: 'up' };
      return undefined;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  initGrid(unwalkables) {
    try {
      const grid = new pathFinder.Grid(this.board.width, this.board.height);
      unwalkables.forEach((field) => {
        grid.setWalkableAt(field.x, field.y, false);
      });
      return grid;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  getAllUnwalkables(dropMyTail = false, avoidSnakes = true) {
    try {
      let unwalkables = [];
      unwalkables = unwalkables.concat(this.me.body);
      if (dropMyTail === true) {
        if (this.me.getDistanceHeadTail() > 1) {
          unwalkables = unwalkables.filter((item) => {
            const bool = (JSON.stringify(item) !== JSON.stringify(this.me.tail));
            return bool;
          });
        }
      }

      this.snakes.forEach((snake) => {
        if (snake.name === this.me.name) {
          return;
        }

        unwalkables = unwalkables.concat(snake.body);

        if (avoidSnakes === true) {
          if (snake.length >= this.me.length) {
            if (snake.head.x - 1 >= 0) {
              unwalkables.push({ x: snake.head.x - 1, y: snake.head.y });
            }
            if (snake.head.x + 1 <= this.board.width - 1) {
              unwalkables.push({ x: snake.head.x + 1, y: snake.head.y });
            }
            if (snake.head.y - 1 >= 0) {
              unwalkables.push({ x: snake.head.x, y: snake.head.y - 1 });
            }
            if (snake.head.y + 1 <= this.board.height - 1) {
              unwalkables.push({ x: snake.head.x, y: snake.head.y + 1 });
            }
          }
        }
      });

      return unwalkables;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

module.exports = Game;
