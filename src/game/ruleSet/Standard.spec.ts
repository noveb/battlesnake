import gameState from './__fixture__/gameState';
import nextGameState from './__fixture__/nextGameState';
import { createNextBoardState } from './Standard';
import { Move } from '../../shared/types';

describe('createNextBoardState', () => {
  it('should build the exact next gameState', () => {
    const moves: Move[] = [
      { id: 'gs_wpTTGwQkYqHfpSGwhmmMhSYR', move: 'left' },
      { id: 'gs_R96DB3WWBQMXS6BmyMfgB3kQ', move: 'down' },
      { id: 'gs_M8gqKGYB6ThPj9HSv9Cjx8JB', move: 'left' },
      { id: 'gs_v8ky6xKS4hPDWq99qCXYRwyF', move: 'up' },
    ];
    const result = createNextBoardState(gameState, moves);
    expect(result).toEqual(nextGameState);
  });
});
