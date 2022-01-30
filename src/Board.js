class Board {
  constructor(board, logger) {
    this.logger = logger;
    this.height = board.height;
    this.width = board.width;
    this.food = board.food;
  }

  checkMoves(directions) {
    const newDirections = { ...directions };
    try {
      Object.keys(directions).forEach((key) => {
        if (this.isWall(directions[key])) {
          newDirections[key].wall = true;
        }
        if (this.isFood(directions[key])) {
          newDirections[key].food = true;
        }
      });
      return newDirections;
    } catch (error) {
      this.logger.error(error);
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
      return false;
    });
    return isFood;
  }
}
exports.Board = Board;
