import type { GameStatus } from '../../../shared/types';

export default <GameStatus> {
  game: {
    id: '077b2cf2-823d-4446-9156-fcc3d979de96',
    ruleset: {
      name: 'standard',
      version: 'v1.0.25',
      settings: {
        foodSpawnChance: 15,
        minimumFood: 1,
        hazardDamagePerTurn: 0,
      },
    },
    timeout: 500,
    source: 'arena',
  },
  turn: 0,
  board: {
    height: 11,
    width: 11,
    snakes: [
      {
        id: 'gs_wpTTGwQkYqHfpSGwhmmMhSYR',
        name: 'Badly Coded Snake',
        latency: '31',
        health: 100,
        body: [
          {
            x: 1,
            y: 9,
          },
          {
            x: 1,
            y: 9,
          },
          {
            x: 1,
            y: 9,
          },
        ],
        head: {
          x: 1,
          y: 9,
        },
        length: 3,
        shout: '',
        squad: '',
        customizations: {
          color: '#6f42c1',
          head: 'silly',
          tail: 'curled',
        },
      },
      {
        id: 'gs_R96DB3WWBQMXS6BmyMfgB3kQ',
        name: 'common adder',
        latency: '18',
        health: 100,
        body: [
          {
            x: 1,
            y: 1,
          },
          {
            x: 1,
            y: 1,
          },
          {
            x: 1,
            y: 1,
          },
        ],
        head: {
          x: 1,
          y: 1,
        },
        length: 3,
        shout: '',
        squad: '',
        customizations: {
          color: '#000000',
          head: 'pixel',
          tail: 'pixel',
        },
      },
      {
        id: 'gs_M8gqKGYB6ThPj9HSv9Cjx8JB',
        name: 'Harry',
        latency: '50',
        health: 100,
        body: [
          {
            x: 9,
            y: 9,
          },
          {
            x: 9,
            y: 9,
          },
          {
            x: 9,
            y: 9,
          },
        ],
        head: {
          x: 9,
          y: 9,
        },
        length: 3,
        shout: '',
        squad: '',
        customizations: {
          color: '#cc8800',
          head: 'evil',
          tail: 'sharp',
        },
      },
      {
        id: 'gs_v8ky6xKS4hPDWq99qCXYRwyF',
        name: 'Robin',
        latency: '62',
        health: 100,
        body: [
          {
            x: 9,
            y: 1,
          },
          {
            x: 9,
            y: 1,
          },
          {
            x: 9,
            y: 1,
          },
        ],
        head: {
          x: 9,
          y: 1,
        },
        length: 3,
        shout: '',
        squad: '',
        customizations: {
          color: '#8b00ff',
          head: 'smart-caterpillar',
          tail: 'mouse',
        },
      },
    ],
    food: [
      {
        x: 0,
        y: 10,
      },
      {
        x: 0,
        y: 0,
      },
      {
        x: 8,
        y: 10,
      },
      {
        x: 10,
        y: 2,
      },
      {
        x: 5,
        y: 5,
      },
    ],
    hazards: [],
  },
  you: {
    id: 'gs_R96DB3WWBQMXS6BmyMfgB3kQ',
    name: 'common adder',
    latency: '',
    health: 100,
    body: [
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
      {
        x: 1,
        y: 1,
      },
    ],
    head: {
      x: 1,
      y: 1,
    },
    length: 3,
    shout: '',
    squad: '',
    customizations: {
      color: '#000000',
      head: 'pixel',
      tail: 'pixel',
    },
  },
};
