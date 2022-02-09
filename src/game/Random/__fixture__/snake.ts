import { ISnake } from '../../../shared/types';

export default <ISnake> {
  id: 'snake-508e96ac-94ad-11ea-bb37',
  name: 'My Snake',
  health: 54,
  body: [
    {
      x: 1,
      y: 1,
    },
    {
      x: 2,
      y: 1,
    },
    {
      x: 2,
      y: 2,
    },
  ],
  latency: '111',
  head: {
    x: 1,
    y: 1,
  },
  length: 3,
  shout: 'why are we shouting??',
  squad: '',
  customizations: {
    color: '#FF0000',
    head: 'pixel',
    tail: 'pixel',
  },
};
