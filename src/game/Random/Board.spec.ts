import { cloneDeep } from 'lodash';
import { Directions, IBoard } from '../../shared/types';
import Board from './Board';
import fixtureBoard from './__fixture__/board';

let board: IBoard;

describe('Random', () => {
  beforeEach(() => {
    board = cloneDeep(fixtureBoard);
  });

  describe('Board', () => {
    describe('isWall', () => {
      it('should work with lower left corner', () => {
        const testBoard = new Board(board);
        const result = testBoard.isWall({ x: 0, y: 0 });
        expect(result).toEqual(false);
      });

      it('should work with lower right corner', () => {
        const testBoard = new Board(board);
        const result = testBoard.isWall({ x: 2, y: 0 });
        expect(result).toEqual(false);
      });

      it('should work with upper left corner', () => {
        const testBoard = new Board(board);
        const result = testBoard.isWall({ x: 0, y: 2 });
        expect(result).toEqual(false);
      });

      it('should work with upper right corner', () => {
        const testBoard = new Board(board);
        const result = testBoard.isWall({ x: 2, y: 2 });
        expect(result).toEqual(false);
      });

      it('should not work with values outside upper right corner', () => {
        const testBoard = new Board(board);
        const result = testBoard.isWall({ x: 3, y: 3 });
        expect(result).toEqual(true);
      });

      it('should work with values outside lower left corner', () => {
        const testBoard = new Board(board);
        const result = testBoard.isWall({ x: 0, y: -1 });
        expect(result).toEqual(true);
      });
    });

    describe('checkWall', () => {
      it('should find four fields for center position', () => {
        const testBoard = new Board(board);
        const testDirection: Directions = {
          left: { x: 0, y: 1 },
          right: { x: 2, y: 1 },
          up: { x: 1, y: 2 },
          down: { x: 1, y: 0 },
        };
        const expectedResult: Directions = {
          left: { x: 0, y: 1, wall: false },
          right: { x: 2, y: 1, wall: false },
          up: { x: 1, y: 2, wall: false },
          down: { x: 1, y: 0, wall: false },
        };
        const result = testBoard.checkWall(testDirection);
        expect(result).toEqual(expectedResult);
      });

      it('should find two fields for lower left corner', () => {
        const testBoard = new Board(board);
        const testDirection: Directions = {
          left: { x: -1, y: 0 },
          right: { x: 1, y: 0 },
          up: { x: 0, y: 1 },
          down: { x: 0, y: -1 },
        };
        const expectedResult: Directions = {
          left: { x: -1, y: 0, wall: true },
          right: { x: 1, y: 0, wall: false },
          up: { x: 0, y: 1, wall: false },
          down: { x: 0, y: -1, wall: true },
        };
        const result = testBoard.checkWall(testDirection);
        expect(result).toEqual(expectedResult);
      });

      it('should find two fields for upper right corner', () => {
        const testBoard = new Board(board);
        const testDirection: Directions = {
          left: { x: 1, y: 2 },
          right: { x: 3, y: 2 },
          up: { x: 2, y: 3 },
          down: { x: 2, y: 1 },
        };
        const expectedResult: Directions = {
          left: { x: 1, y: 2, wall: false },
          right: { x: 3, y: 2, wall: true },
          up: { x: 2, y: 3, wall: true },
          down: { x: 2, y: 1, wall: false },
        };
        const result = testBoard.checkWall(testDirection);
        expect(result).toEqual(expectedResult);
      });
    });

    describe('checkFood', () => {
      it('should find four foods for center position', () => {
        const testBoard = new Board(board);
        const testDirection: Directions = {
          left: { x: 0, y: 1 },
          right: { x: 2, y: 1 },
          up: { x: 1, y: 2 },
          down: { x: 1, y: 0 },
        };
        const expectedResult: Directions = {
          left: { x: 0, y: 1, food: true },
          right: { x: 2, y: 1, food: true },
          up: { x: 1, y: 2, food: true },
          down: { x: 1, y: 0, food: true },
        };
        const result = testBoard.checkFood(testDirection);
        expect(result).toEqual(expectedResult);
      });

      it('should find two foods for lower left corner', () => {
        const testBoard = new Board(board);
        const testDirection: Directions = {
          left: { x: -1, y: 0 },
          right: { x: 1, y: 0 },
          up: { x: 0, y: 1 },
          down: { x: 0, y: -1 },
        };
        const expectedResult: Directions = {
          left: { x: -1, y: 0, food: false },
          right: { x: 1, y: 0, food: true },
          up: { x: 0, y: 1, food: true },
          down: { x: 0, y: -1, food: false },
        };
        const result = testBoard.checkFood(testDirection);
        expect(result).toEqual(expectedResult);
      });

      it('should find two foods for upper right corner', () => {
        const testBoard = new Board(board);
        const testDirection: Directions = {
          left: { x: 1, y: 2 },
          right: { x: 3, y: 2 },
          up: { x: 2, y: 3 },
          down: { x: 2, y: 1 },
        };
        const expectedResult: Directions = {
          left: { x: 1, y: 2, food: true },
          right: { x: 3, y: 2, food: false },
          up: { x: 2, y: 3, food: false },
          down: { x: 2, y: 1, food: true },
        };
        const result = testBoard.checkFood(testDirection);
        expect(result).toEqual(expectedResult);
      });
    });

    describe('checkSnakes', () => {
      it('should find four snakes for center position with fake snake tails', () => {
        board.snakes[0].body.push({ x: 0, y: 0 });
        board.snakes[1].body.push({ x: 2, y: 2 });
        const testBoard = new Board(board);

        const testDirection: Directions = {
          left: { x: 0, y: 1 },
          right: { x: 2, y: 1 },
          up: { x: 1, y: 2 },
          down: { x: 1, y: 0 },
        };
        const expectedResult: Directions = {
          left: { x: 0, y: 1, snake: true },
          right: { x: 2, y: 1, snake: true },
          up: { x: 1, y: 2, snake: true },
          down: { x: 1, y: 0, snake: true },
        };
        const result = testBoard.checkSnakes(testDirection);
        expect(result).toEqual(expectedResult);
      });

      it('should find two snakes for center position', () => {
        const testBoard = new Board(board);
        const testDirection: Directions = {
          left: { x: 0, y: 1 },
          right: { x: 2, y: 1 },
          up: { x: 1, y: 2 },
          down: { x: 1, y: 0 },
        };
        const expectedResult: Directions = {
          left: { x: 0, y: 1, snake: true },
          right: { x: 2, y: 1, snake: false },
          up: { x: 1, y: 2, snake: false },
          down: { x: 1, y: 0, snake: true },
        };
        const result = testBoard.checkSnakes(testDirection);
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
