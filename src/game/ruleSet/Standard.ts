/*
 * Implementation of the standard game rules from
 * https://github.com/BattlesnakeOfficial/rules/blob/main/standard.go
*/

/* eslint-disable no-param-reassign */
import { cloneDeep } from 'lodash';
import {
  Coordinate, GameStatus, ISnake, Move,
} from '../../shared/types';

const SnakeMaxHealth = 100;

function moveSnakes(gameState: GameStatus, moves: Move[]) {
  gameState.board.snakes.forEach((snake) => {
    if (snake.eliminated) {
      return;
    }
    moves.forEach((move) => {
      if (!move) return;
      if (move.id === snake.id) {
        const newHead: Coordinate = { x: snake.body[0].x, y: snake.body[0].y };
        switch (move.move) {
          case 'up':
            newHead.x = snake.body[0].x;
            newHead.y = snake.body[0].y + 1;
            break;
          case 'down':
            newHead.x = snake.body[0].x;
            newHead.y = snake.body[0].y - 1;
            break;
          case 'left':
            newHead.x = snake.body[0].x - 1;
            newHead.y = snake.body[0].y;
            break;
          case 'right':
            newHead.x = snake.body[0].x + 1;
            newHead.y = snake.body[0].y;
            break;

          default:
            break;
        }
        snake.body.unshift(newHead);
        snake.body.pop();
      }
    });
  });
}

function reduceSnakeHealth(gameState: GameStatus) {
  gameState.board.snakes.forEach((snake) => {
    if (!snake.eliminated) {
      snake.health -= 1;
    }
  });
}

function snakeIsOutOfHealth(snake: ISnake) {
  return snake.health <= 0;
}

function snakeIsOutOfBounds(snake: ISnake, boardWith: number, boardHeight: number) {
  return snake.body.map((point) => {
    if (point.x < 0 || point.x >= boardWith) return true;
    if (point.y < 0 || point.y >= boardHeight) return true;
    return false;
  })
    .some((value) => value === true);
}

function snakeHasBodyCollided(snake: ISnake, other: ISnake) {
  const head = snake.body[0];
  return other.body.map((point, index) => {
    if (index !== 0 && head.x === point.x && head.y === point.y) {
      return true;
    }
    return false;
  })
    .some((value) => value === true) || false;
}

function snakeHasLostHeadToHead(snake: ISnake, other: ISnake) {
  if (snake.body[0].x === other.body[0].x && snake.body[0].y === other.body[0].y) {
    return snake.body.length <= other.body.length;
  }
  return false;
}

function feedSnake(snake: ISnake) {
  if (snake.body.length) {
    snake.body.push(snake.body.slice(-1)[0]);
  }
  snake.health = SnakeMaxHealth;
}

function maybeEliminateSnakes(gameState: GameStatus) {
  const snakeIndicesByLength = gameState.board.snakes.map((snake, index) => index);
  snakeIndicesByLength.sort((a, b) => {
    const lengthA = gameState.board.snakes[a].body.length;
    const lengthB = gameState.board.snakes[b].body.length;
    return lengthA - lengthB;
  });

  gameState.board.snakes.forEach((snake) => {
    if (snake.eliminated) {
      return;
    }
    if (snakeIsOutOfHealth(snake)) {
      snake.eliminated = true;
    }
    if (snakeIsOutOfBounds(snake, gameState.board.width, gameState.board.height)) {
      snake.eliminated = true;
    }
  });

  gameState.board.snakes.forEach((snake) => {
    if (snake.eliminated) {
      return;
    }
    if (snakeHasBodyCollided(snake, snake)) {
      snake.eliminated = true;
    }

    let hasBodyCollided = false;
    snakeIndicesByLength.forEach((index) => {
      const other = gameState.board.snakes[index];
      if (other.eliminated) return;
      if (snake.id !== other.id && snakeHasBodyCollided(snake, other)) {
        snake.eliminated = true;
        hasBodyCollided = true;
      }
    });
    if (hasBodyCollided) return;

    snakeIndicesByLength.forEach((index) => {
      const other = gameState.board.snakes[index];
      if (other.eliminated) return;
      if (snake.id !== other.id && snakeHasLostHeadToHead(snake, other)) {
        snake.eliminated = true;
      }
    });
  });
}

function maybeFeedSnake(gameState: GameStatus) {
  const newFood: Coordinate[] = [];
  gameState.board.food.forEach((food) => {
    let foodHasBeenEaten = false;
    gameState.board.snakes.forEach((snake) => {
      if (snake.eliminated) return;
      if (snake.body[0].x === food.x && snake.body[0].y === food.y) {
        feedSnake(snake);
        foodHasBeenEaten = true;
      }
    });
    if (!foodHasBeenEaten) {
      newFood.push(food);
    }
  });
  gameState.board.food = newFood;
}

function setSnakeHeads(gameState: GameStatus) {
  gameState.board.snakes.forEach((snake) => {
    [snake.head] = snake.body;
  });
}

function setMySnake(gameState: GameStatus) {
  const [me] = gameState.board.snakes.filter((snake) => snake.id === gameState.you.id);
  gameState.you = me;
}

export function isGameOver(gameState: GameStatus) {
  let remainingSnakes = 0;
  gameState.board.snakes.forEach((snake) => {
    if (!snake.eliminated) remainingSnakes += 1;
  });
  return remainingSnakes <= 1;
}

export function createNextBoardState(gameState: GameStatus, moves: Move[]) {
  const nextGameState = cloneDeep(gameState);

  moveSnakes(nextGameState, moves);

  reduceSnakeHealth(nextGameState);

  maybeFeedSnake(nextGameState);

  maybeEliminateSnakes(nextGameState);

  setSnakeHeads(nextGameState);

  setMySnake(nextGameState);

  nextGameState.turn += 1;

  return nextGameState;
}
