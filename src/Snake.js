class Snake {
  constructor(snake, logger) {
    this.logger = logger;
    this.id = snake.id;
    this.name = snake.name;
    this.health = snake.health;
    this.body = snake.body;
    this.length = this.body.length;
    [this.head] = this.body;
    [this.tail] = this.body.slice(-1);
  }

  checkMoves(directions) {
    const newDirections = { ...directions };
    try {
      Object.keys(directions).forEach((key) => {
        if (this.isSnake(directions[key])) {
          newDirections[key].snake = true;
        }
      });
      return newDirections;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  isSnake(coord = { x: Number, y: Number }) {
    try {
      let isSnake = false;
      isSnake = this.body.find((element) => {
        if (element.x === coord.x && element.y === coord.y) {
          return true;
        }
        return false;
      });
      return isSnake;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
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
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  getDistanceHeadTail() {
    try {
      const dx = this.head.x - this.tail.x;
      const dy = this.head.y - this.tail.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      return d;
    } catch (error) {
      this.logger.error(error);
      // return minimal possible distance
      return 0;
    }
  }
}
exports.Snake = Snake;
