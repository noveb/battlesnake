import soloGameStatus from './__fixture__/gameState-buildTree-solo';
import duelGameStatus from './__fixture__/gameState-buildTree-duel';
import Strategy from './Strategy';

describe('Strategy', () => {
  beforeEach(() => {});

  describe('buildTree', () => {
    it('should build a tree with 5 nodes and 4 leafs', () => {
      const strategy = new Strategy(soloGameStatus);
      const result = strategy.buildTree();

      expect(result.root.hasChildren()).toEqual(true);
      expect(result.root.children?.length).toEqual(2);
    });

    it('should build a tree with 5 nodes and 4 leafs', () => {
      const strategy = new Strategy(duelGameStatus);
      const simulationDepth = Infinity;
      const result = strategy.buildTree(simulationDepth);

      expect(result.root.hasChildren()).toEqual(true);
      expect(result.root.children?.length).toEqual(4);
    });
  });
});
