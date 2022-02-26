import { initBoard, floodFill } from './floodFill';
import { withoutObstacles, withObstacles } from './__expectedResult__/initializedBoard';

describe('Random', () => {
  describe('FloodFill', () => {
    describe('initBoard', () => {
      it('should return an initialized 2D array', () => {
        const height = 10;
        const width = 10;

        const result = initBoard(height, width, []);
        expect(result).toEqual(withoutObstacles);
      });
      it('should return an initialized 2D array', () => {
        const height = 10;
        const width = 10;
        const obstacles = [
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 2 },
          { x: 1, y: 3 },
          { x: 1, y: 4 },
          { x: 1, y: 5 },
          { x: 1, y: 6 },
          { x: 1, y: 7 },
          { x: 1, y: 8 },
          { x: 1, y: 9 },
        ];

        const result = initBoard(height, width, obstacles);
        expect(result).toEqual(withObstacles);
      });
    });

    describe('floodFill', () => {
      it('should find one of one field', () => {
        const height = 1;
        const width = 1;
        const expectedResult = {
          board: [
            [
              {
                x: 0, y: 0, obstacle: false, reachable: true,
              },
            ],
          ],
          reachableCounter: 1,
        };

        const readyBoard = initBoard(height, width, []);
        const result = floodFill(readyBoard, 0, 0);

        expect(result).toEqual(expectedResult);
      });

      it('should find all of 100 fields', () => {
        const height = 10;
        const width = 10;
        const expectedReachableCounter = 100;

        const readyBoard = initBoard(height, width, []);
        const result = floodFill(readyBoard, 0, 0);

        expect(result.board).toBeInstanceOf(Array);
        expect(result.reachableCounter).toEqual(expectedReachableCounter);
      });

      it('should find ten of 100 fields', () => {
        const height = 10;
        const width = 10;
        const obstacles = [
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: 2 },
          { x: 1, y: 3 },
          { x: 1, y: 4 },
          { x: 1, y: 5 },
          { x: 1, y: 6 },
          { x: 1, y: 7 },
          { x: 1, y: 8 },
          { x: 1, y: 9 },
        ];
        const expectedReachableCounter = 10;

        const readyBoard = initBoard(height, width, obstacles);
        const result = floodFill(readyBoard, 0, 0);

        expect(result.board).toBeInstanceOf(Array);
        expect(result.reachableCounter).toEqual(expectedReachableCounter);
      });

      it('should find 54 of 100 fields', () => {
        const height = 10;
        const width = 10;
        const obstacles = [
          { x: 1, y: 0 },
          { x: 2, y: 1 },
          { x: 3, y: 2 },
          { x: 4, y: 3 },
          { x: 5, y: 4 },
          { x: 6, y: 5 },
          { x: 7, y: 6 },
          { x: 8, y: 7 },
          { x: 9, y: 8 },
          { x: 9, y: 9 },
        ];
        const expectedReachableCounter = 54;

        const readyBoard = initBoard(height, width, obstacles);
        const result = floodFill(readyBoard, 0, 0);

        expect(result.board).toBeInstanceOf(Array);
        expect(result.reachableCounter).toEqual(expectedReachableCounter);
      });
    });
  });
});
