const Game1 = require('./game-v1');
const Game2 = require('./game-v3');

class MoveController {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }

    move() {
        try {
            const myGame2 = new Game2(this.request.body);

            let move;

            // if (move === undefined) {
                //     move = myGame2.nextMoveTail(true);
                //     console.log(`Turn: ${this.request.body.turn}: myGame2.nextMoveTail avoidSnakes: `, move);
            // }
            // if (move === undefined) {
            //     move = myGame2.nextMoveFood(false);
            //     console.log(`Turn: ${this.request.body.turn}: myGame2.nextMoveFood: `, move);
            // }
            if (move === undefined) {
                move = myGame2.calcPathFromFoodToMe();
                console.log(`Turn: ${this.request.body.turn}: myGame2.calcPathFromFoodToMe: `, move);
            }
            // if (move === undefined) {
            //     move = myGame2.nextMoveFood();
            //     console.log(`Turn: ${this.request.body.turn}: myGame2.nextMoveFood: avoidSnakes`, move);
            // }
            // if (move === undefined) {
            //     const myGame1 = new Game1(this.request.body);
            //     move = myGame1.nextMoveRandom();
            //     console.log(`Turn: ${this.request.body.turn}: myGame1.nextMoveRandom: `, move);
            // }

            return this.response.json(move);
        } catch (error) {
            console.error(error);
            return this.response.statusCode(500);
        }
    }
}

module.exports = MoveController;
