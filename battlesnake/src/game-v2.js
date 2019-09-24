'use strict';
const pathFinder = require('pathfinding');

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
        try {
            let unwalkables = this.getAllUnwalkables()
            console.log(unwalkables)
            let grid = this.initGrid(unwalkables)
            let path = new Array(999999)
            let aStar = new pathFinder.AStarFinder()
            for (let food of this.board.food) {
                let workingGrid = grid.clone()
                let workingPath = aStar.findPath(
                    this.me.body[0].x,
                    this.me.body[0].y,
                    food.x, food.y, workingGrid
                )
                if (workingPath.length > 0 && workingPath.length < path.length) {
                    path = workingPath
                }
            }
            let direction = this.getDirectionFromCoords(this.me.body[0], { x: path[1][0], y: path[1][1] })
            console.log (direction)
            return direction
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    getDirectionFromCoords (start = {x, y}, goal = {x, y}) {
        try {
            if (goal.x > start.x) return { 'move': 'right' }
            if (goal.x < start.x) return { 'move': 'left' }
            if (goal.y > start.y) return { 'move': 'down' }
            if (goal.y < start.y) return { 'move': 'up' }
            console.log('ups')
        } catch (error) {
            console.error(error)
        }
    }

    initGrid (unwalkables) {
        let grid = new pathFinder.Grid(this.board.width, this.board.height)
        for (let field of unwalkables){
            grid.setWalkableAt(field.x, field.y, false)
        }
        return grid
    }

    getAllUnwalkables () {
        try {
            let unwalkables = []
            unwalkables = unwalkables.concat(this.me.body)
            console.log(unwalkables)
            for (let snake of this.snakes) {
                unwalkables = unwalkables.concat(snake.body)
            }
            console.log(unwalkables)

            return unwalkables
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
        console.log('BOARD :: OK')
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