import { cloneDeep } from 'lodash';
import { Directions, GameStatus } from '../../shared/types';
import Strategy from './Strategy';
import fixtureGameStatus from './__fixture__/gameStatus';

let gameStatus: GameStatus;

describe('Random', () => {
  beforeEach(() => {
    gameStatus = cloneDeep(fixtureGameStatus);
  });

  describe('Snake', () => {
    describe('isDesperatePosition', () => {
      it('should not find a desperate position', () => {
        const fixtureDirections: Directions = {
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
        const result = Strategy.isDesperatePosition(fixtureDirections);
        const expectedResult = false;
        expect(result).toEqual(expectedResult);
      });

      it('should find a desperate position when all positions are snakes', () => {
        const fixtureDirections: Directions = {
          left: {
            x: 0, y: 1, wall: false, food: false, snake: true,
          },
          right: {
            x: 2, y: 1, wall: false, food: false, snake: true,
          },
          up: {
            x: 1, y: 2, wall: false, food: false, snake: true,
          },
          down: {
            x: 1, y: 0, wall: false, food: false, snake: true,
          },
        };

        const result = Strategy.isDesperatePosition(fixtureDirections);
        const expectedResult = true;
        expect(result).toEqual(expectedResult);
      });

      it('should find a desperate position when all positions are walls', () => {
        const fixtureDirections: Directions = {
          left: {
            x: 0, y: 1, wall: true, food: false, snake: false,
          },
          right: {
            x: 2, y: 1, wall: true, food: false, snake: false,
          },
          up: {
            x: 1, y: 2, wall: true, food: false, snake: false,
          },
          down: {
            x: 1, y: 0, wall: true, food: false, snake: false,
          },
        };

        const result = Strategy.isDesperatePosition(fixtureDirections);
        const expectedResult = true;
        expect(result).toEqual(expectedResult);
      });

      it('should find a desperate position when all positions are snakes or walls', () => {
        const fixtureDirections: Directions = {
          left: {
            x: 0, y: 1, wall: true, food: false, snake: false,
          },
          right: {
            x: 2, y: 1, wall: false, food: false, snake: true,
          },
          up: {
            x: 1, y: 2, wall: true, food: false, snake: false,
          },
          down: {
            x: 1, y: 0, wall: false, food: false, snake: true,
          },
        };

        const result = Strategy.isDesperatePosition(fixtureDirections);
        const expectedResult = true;
        expect(result).toEqual(expectedResult);
      });
    });

    describe('findPossibleMoves', () => {
      it('should find four possible moves when there is nothing', () => {
        const fixtureDirections: Directions = {
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

        const result = Strategy.findPossibleMoves(fixtureDirections);
        const expectedResult = {
          foodMoves: [],
          otherMoves: [{ move: 'left' }, { move: 'right' }, { move: 'up' }, { move: 'down' }],
        };
        expect(result).toEqual(expectedResult);
      });

      it('should find no possible move when there is no one', () => {
        const fixtureDirections: Directions = {
          left: {
            x: 0, y: 1, wall: true, food: false, snake: false,
          },
          right: {
            x: 2, y: 1, wall: false, food: true, snake: true,
          },
          up: {
            x: 1, y: 2, wall: true, food: false, snake: false,
          },
          down: {
            x: 1, y: 0, wall: false, food: true, snake: true,
          },
        };

        const result = Strategy.findPossibleMoves(fixtureDirections);
        const expectedResult = {
          foodMoves: [],
          otherMoves: [],
        };
        expect(result).toEqual(expectedResult);
      });

      it('should find food moves and possible moves', () => {
        const fixtureDirections: Directions = {
          left: {
            x: 0, y: 1, wall: false, food: false, snake: false,
          },
          right: {
            x: 2, y: 1, wall: false, food: true, snake: false,
          },
          up: {
            x: 1, y: 2, wall: false, food: false, snake: false,
          },
          down: {
            x: 1, y: 0, wall: false, food: true, snake: false,
          },
        };

        const result = Strategy.findPossibleMoves(fixtureDirections);
        const expectedResult = {
          foodMoves: [{ move: 'right' }, { move: 'down' }],
          otherMoves: [{ move: 'left' }, { move: 'up' }],
        };
        expect(result).toEqual(expectedResult);
      });
    });

    describe('findPossibleMoves', () => {
      it('should find four possible moves when there is nothing', () => {
        const strategy = new Strategy(gameStatus);

        const result = strategy.nextMoveRandom();

        const expectedResult = { move: 'right' };

        expect(result).toEqual(expectedResult);
      });
    });
  });
});
