import type { Coordinate, GameStatus } from '../../../shared/types';

// assuming a 3x3 board
// const lowerLeft = { x: 0, y: 0 };
const lowerRight = { x: 1, y: 0 };
const upperLeft = { x: 0, y: 1 };
// const upperRight = { x: 1, y: 1 };

export default <GameStatus> {
  game: {
    id: 'game-00fe20da-94ad-11ea-bb37',
    ruleset: {
      name: 'standard',
      version: 'v.1.2.3',
    },
    timeout: 500,
  },
  turn: 14,
  board: {
    height: 2,
    width: 2,
    food: [] as Coordinate[],
    hazards: [] as Coordinate[],
    snakes: [
      {
        id: 'snake-508e96ac-94ad-11ea-bb37',
        name: 'My Snake',
        health: 54,
        body: [upperLeft],
        latency: '111',
        head: upperLeft,
        length: 1,
        shout: 'why are we shouting??',
        squad: '',
        customizations: {
          color: '#FF0000',
          head: 'pixel',
          tail: 'pixel',
        },
      },
      {
        id: 'snake-b67f4906-94ae-11ea-bb37',
        name: 'Another Snake',
        health: 3,
        body: [lowerRight],
        latency: '222',
        head: lowerRight,
        length: 1,
        shout: "I'm not really sure...",
        squad: '',
        customizations: {
          color: '#26CF04',
          head: 'silly',
          tail: 'curled',
        },
      },
    ],
  },
  you: {
    id: 'snake-508e96ac-94ad-11ea-bb37',
    name: 'My Snake',
    health: 54,
    body: [upperLeft],
    latency: '111',
    head: upperLeft,
    length: 1,
    shout: 'why are we shouting??',
    squad: '',
    customizations: {
      color: '#FF0000',
      head: 'pixel',
      tail: 'pixel',
    },
  },
};
