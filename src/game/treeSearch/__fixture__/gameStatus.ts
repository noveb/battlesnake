import type { GameStatus } from '../../../shared/types';

// assuming a 3x3 board
const lowerLeft = { x: 0, y: 0 };
const lowerMid = { x: 1, y: 0 };
const lowerRight = { x: 2, y: 0 };
const midLeft = { x: 0, y: 1 };
const center = { x: 1, y: 1 };
const midRight = { x: 2, y: 1 };
const upperLeft = { x: 0, y: 2 };
const upperMid = { x: 1, y: 2 };
const upperRight = { x: 2, y: 2 };

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
    height: 3,
    width: 3,
    food: [
      upperMid,
      midRight,
      lowerRight,
    ],
    hazards: [
      lowerLeft,
    ],
    snakes: [
      {
        id: 'snake-508e96ac-94ad-11ea-bb37',
        name: 'My Snake',
        health: 54,
        body: [
          midLeft,
          upperLeft,
        ],
        latency: '111',
        head: midLeft,
        length: 3,
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
        health: 16,
        body: [
          upperMid,
          upperRight,
        ],
        latency: '222',
        head: upperMid,
        length: 4,
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
    body: [center, lowerMid],
    latency: '111',
    head: center,
    length: 3,
    shout: 'why are we shouting??',
    squad: '',
    customizations: {
      color: '#FF0000',
      head: 'pixel',
      tail: 'pixel',
    },
  },
};
