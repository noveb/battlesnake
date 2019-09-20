'use strict';

const direction = {
    0: 'up',
    1: 'right',
    2: 'down',
    3: 'left'
}

class Game {

    constructor (game) {
        this.board = new Board(game.board)
        this.me = new Snake(game.you)
        this.snakes = []
        for (let snake of game.board.snakes) {
            this.snakes.push(new Snake(snake))
        }
        console.log('GAME :: OK')
    }

    nextMoveFood () {
        let directions = this.getDirections()

        if (directions.left.food && !directions.left.snake && !directions.left.wall) {
            return { move: 'left' }
        } else if (directions.right.food && !directions.right.snake && !directions.right.wall) {
            return { move: 'right' }
        } else if (directions.up.food && !directions.up.snake && !directions.up.wall) {
            return { move: 'up' }
        } else if (directions.down.food && !directions.down.snake && !directions.down.wall) {
            return { move: 'down' }
        }
        return this.nextMoveRandom()
    }

    nextMoveRandom () {
        try {
            let directions = this.getDirections()

            console.log(directions)
            let random = Math.floor(Math.random()*4)
            if (random === 0 && !directions.left.snake && !directions.left.wall) {
                return { move: 'left' }
            } else if (random === 1 && !directions.right.snake && !directions.right.wall) {
                return { move: 'right' }
            } else if (random === 2 && !directions.up.snake && !directions.up.wall) {
                return { move: 'up' }
            } else if (random === 3 && !directions.down.snake && !directions.down.wall) {
                return { move: 'down' }
            } else if (
                (directions.left.snake || directions.left.wall) &&
                (directions.right.snake || directions.right.wall) &&
                (directions.up.snake || directions.up.wall) &&
                (directions.down.snake || directions.down.wall)
            ) {
                return { move: 'death' }
            }
            return this.nextMoveRandom()
        } catch (error) {
            console.error(error)
        }
    }

    getDirections () {
        try {
            let directions = this.me.possibleMoves()
            directions = this.me.checkMoves(directions)
            for (let snake of this.snakes) {
                directions = snake.checkMoves(directions)
            }
            directions = this.board.checkMoves(directions)

            console.log(directions)
            return directions
        } catch (error) {
            console.error(error)
        }
    }

}

class Snake {
    constructor (snake) {
        this.id = snake.id
        this.name = snake.name
        this.health = snake.health
        this.body = snake.body
        console.log('SNAKE :: OK')
    }

    checkMoves (directions) {
        try {
            for (const key of Object.keys(directions)) {
                if (this.isSnake(directions[key])) {
                    directions[key].snake = true
                }
            }
            return directions
        } catch (error) {
            console.error(error)
        }
    }

    isSnake (coord = { x, y }) {
        let isSnake = false
        isSnake = this.body.find((element) => {
            if(element.x === coord.x && element.y === coord.y) {
                return true
            }
        })
        return isSnake
    }

    possibleMoves ()  {
        try {
            let head = this.body[0]
            let stati = { snake: false, wall: false, food: false }
            let directions = {}
            directions['right'] = Object.assign({ x: head.x + 1, y: head.y }, stati)
            directions['left'] = Object.assign({ x: head.x - 1, y: head.y }, stati)
            directions['up'] = Object.assign({ x: head.x, y: head.y - 1 }, stati)
            directions['down'] = Object.assign({ x: head.x, y: head.y + 1 }, stati)
            return directions
        } catch (error) {
            console.error(error)
        }
    }
}

class Board {
    
    constructor (board) {
        this.height = board.height
        this.width = board.width
        this.food = board.food
        console.log('BOARD :: OK', this.food)
    }

    checkMoves (directions) {
        try {
            for (const key of Object.keys(directions)) {
                if (this.isWall(directions[key])) {
                    directions[key].wall = true
                }
                if (this.isFood(directions[key])) {
                    directions[key].food = true
                }
            }
            return directions
        } catch (error) {
            console.error(error)
        }
    }

    isWall (coord = { x, y }) {
        if (coord.x >= this.width || coord.x < 0) return true
        if (coord.y >= this.height || coord.y < 0) return true
        console.log(coord)
        return false
    }

    isFood (coord = { x, y }) {
        let isFood = false
        isFood = this.food.find((element) => {
            if(element.x === coord.x && element.y === coord.y) {
                return true
            }
        })
        return isFood
    }
}
module.exports = Game