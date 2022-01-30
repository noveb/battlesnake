const Game1 = require('./game-v1');
const Game2 = require('./game-v2');

class MoveController {
  constructor(request, response, logger) {
    this.logger = logger;
    this.request = request;
    this.response = response;
  }

  move() {
    try {
      const myGame2 = new Game2(this.request.body);

      let move;

      if (move === undefined) {
        move = myGame2.nextMoveFood(true);
        this.logger.info(`Turn: ${this.request.body.turn}: myGame2.nextMoveFood: avoidSnakes`, move);
      }
      if (move === undefined) {
        move = myGame2.nextMoveTail(true);
        this.logger.info(`Turn: ${this.request.body.turn}: myGame2.nextMoveTail avoidSnakes: `, move);
      }
      if (move === undefined) {
        move = myGame2.nextMoveFood(false);
        this.logger.info(`Turn: ${this.request.body.turn}: myGame2.nextMoveFood: avoidSnakes`, move);
      }
      if (move === undefined) {
        move = myGame2.nextMoveTail(false);
        this.logger.info(`Turn: ${this.request.body.turn}: myGame2.nextMoveTail avoidSnakes: `, move);
      }
      if (move === undefined) {
        const myGame1 = new Game1(this.request.body);
        move = myGame1.nextMoveRandom();
        this.logger.info(`Turn: ${this.request.body.turn}: myGame1.nextMoveRandom: `, move);
      }

      return this.response.json(move);
    } catch (error) {
      this.logger.error(error);
      return this.response.statusCode(500);
    }
  }
}

module.exports = MoveController;
