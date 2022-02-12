import type { IBoard } from '../../../shared/types';

export default <IBoard> {
  height: 3,
  width: 3,
  food: [
    {
      x: 0,
      y: 1,
    },
    {
      x: 2,
      y: 1,
    },
    {
      x: 1,
      y: 0,
    },
    {
      x: 1,
      y: 2,
    },
  ],
  hazards: [
    {
      x: 0,
      y: 0,
    },
    {
      x: 2,
      y: 2,
    },
  ],
  snakes: [
    {
      id: 'snake-508e96ac-94ad-11ea-bb37',
      name: 'My Snake',
      health: 54,
      body: [
        {
          x: 1,
          y: 0,
        },
        {
          x: 1,
          y: 2,
        },
      ],
      latency: '111',
      head: {
        x: 1,
        y: 0,
      },
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
      health: 16,
      body: [
        {
          x: 0,
          y: 1,
        },
        {
          x: 2,
          y: 1,
        },
      ],
      latency: '222',
      head: {
        x: 0,
        y: 1,
      },
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
};
