import {
  GameStatus, Move,
} from '../../shared/types';
import Tree from './Tree';
import { createNextBoardState, isGameOver } from '../ruleSet/Standard';

export default class Strategy {
  gameState: GameStatus;

  MOVES: Move[] = [
    { move: 'up' },
    { move: 'down' },
    { move: 'left' },
    { move: 'right' },
  ];

  constructor(game: GameStatus) {
    this.gameState = game;
    this.MOVES = [
      { move: 'up' },
      { move: 'down' },
      { move: 'left' },
      { move: 'right' },
    ];
  }

  buildTree(simulationDepth: number = 1): Tree {
    let simDepth = simulationDepth;
    const tree = new Tree(this.gameState);
    const { snakes } = this.gameState.board;
    const soloGame = this.gameState.board.snakes.length === 1;
    // eslint-disable-next-line no-restricted-syntax
    for (const node of tree.preOrderTraversal()) {
      if (!simDepth) break;
      simDepth -= 1;
      for (let i = 0; i < snakes.length; i += 1) {
        for (let j = 0; j < this.MOVES.length; j += 1) {
          const move = this.MOVES[j];
          if (move) {
            const moveWithId: Move = { ...move, id: snakes[i].id };
            const moves: Move[] = [moveWithId];
            const newGameState = createNextBoardState(node.state, moves);
            const gameOver = isGameOver(newGameState, soloGame);
            if (!gameOver) {
              tree.insert(node, newGameState);
            }
          }
        }
      }
    }
    return tree;
  }
}
