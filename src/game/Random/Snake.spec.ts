import { cloneDeep } from 'lodash';
import { Directions, ISnake } from '../../shared/types';
import Snake from './Snake';
import fixtureSnake from './__fixture__/snake';

let snake: ISnake;

describe('Random', () => {
  beforeEach(() => {
    snake = cloneDeep(fixtureSnake);
  });

  describe('Snake', () => {
    describe('possibleMoves', () => {
      it('should work with center position', () => {
        snake.body = [{ x: 1, y: 1 }];
        const testSnake = new Snake(snake);
        const result = testSnake.possibleMoves();
        const expectedResult: Directions = {
          left: {
            x: 0, y: 1, wall: false, food: false, snake: false,
          },
          right: {
            x: 2, y: 1, wall: false, food: false, snake: false,
          },
          up: {
            x: 1, y: 2, wall: false, food: false, snake: false,
          },
          down: {
            x: 1, y: 0, wall: false, food: false, snake: false,
          },
        };
        expect(result).toEqual(expectedResult);
      });

      it('should work with lower left corner', () => {
        snake.body = [{ x: 0, y: 0 }];
        const testSnake = new Snake(snake);
        const result = testSnake.possibleMoves();
        const expectedResult: Directions = {
          left: {
            x: -1, y: 0, wall: false, food: false, snake: false,
          },
          right: {
            x: 1, y: 0, wall: false, food: false, snake: false,
          },
          up: {
            x: 0, y: 1, wall: false, food: false, snake: false,
          },
          down: {
            x: 0, y: -1, wall: false, food: false, snake: false,
          },
        };
        expect(result).toEqual(expectedResult);
      });

      it('should work with upper right corner', () => {
        snake.body = [{ x: 2, y: 2 }];
        const testSnake = new Snake(snake);
        const result = testSnake.possibleMoves();
        const expectedResult: Directions = {
          left: {
            x: 1, y: 2, wall: false, food: false, snake: false,
          },
          right: {
            x: 3, y: 2, wall: false, food: false, snake: false,
          },
          up: {
            x: 2, y: 3, wall: false, food: false, snake: false,
          },
          down: {
            x: 2, y: 1, wall: false, food: false, snake: false,
          },
        };
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
