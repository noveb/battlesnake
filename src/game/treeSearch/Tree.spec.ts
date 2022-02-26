import _ from 'lodash';
import Node from './Node';
import Tree from './Tree';
import gameStatus from './__fixture__/gameStatus';

describe('Tree', () => {
  beforeEach(() => {});

  describe('new Tree', () => {
    it('should return a tree with a root node', () => {
      const tree = new Tree(gameStatus);
      const expectedResult = new Node(0, gameStatus, undefined, []);
      expect(tree).toHaveProperty('root', expectedResult);
    });
  });

  describe('preOrderTraversal', () => {
    it('should return the tree root node when root is the only node', () => {
      const tree = new Tree(gameStatus);
      const [result] = tree.preOrderTraversal();
      expect(result).toEqual(tree.root);
    });

    it('should return the tree root node when root is the only node', () => {
      const tree = new Tree(gameStatus);
      const gameStatus1 = _.cloneDeep(gameStatus);
      gameStatus1.turn += 1;
      tree.insert(tree.root.id, gameStatus1);
      const it = tree.preOrderTraversal();
      const root = it.next();
      const leaf = it.next();
      expect(root.value.state).toEqual(gameStatus);
      expect(leaf.value.state).toEqual(gameStatus1);
    });
  });

  describe('postOrderTraversal', () => {
    it('should return the tree root node when root is the only node', () => {
      const tree = new Tree(gameStatus);
      const [result] = tree.postOrderTraversal();
      expect(result).toEqual(tree.root);
    });

    it('should return the tree root node when root is the only node', () => {
      const tree = new Tree(gameStatus);
      const gameStatus1 = _.cloneDeep(gameStatus);
      gameStatus1.turn += 1;
      tree.insert(tree.root.id, gameStatus1);
      const it = tree.postOrderTraversal();
      const leaf = it.next();
      const root = it.next();
      expect(leaf.value.state).toEqual(gameStatus1);
      expect(root.value.state).toEqual(gameStatus);
    });
  });

  describe('find', () => {
    it('should return the tree root node when root is the only node', () => {
      const tree = new Tree(gameStatus);
      const result = tree.find(0);
      expect(result).toEqual(tree.root);
    });

    it('should return the tree root node when root is the only node', () => {
      const tree = new Tree(gameStatus);
      const gameStatus1 = _.cloneDeep(gameStatus);
      gameStatus1.turn += 1;
      tree.insert(tree.root, gameStatus1);
      const root = tree.find(0);
      const leaf = tree.find(1);
      expect(leaf.state).toEqual(gameStatus1);
      expect(root.state).toEqual(gameStatus);
    });
  });

  describe('getNextId', () => {
    it('should return 0 for the root node', () => {
      const tree = new Tree(gameStatus);
      expect(tree.find(0).id).toEqual(0);
    });

    it('should return 1 for the root node', () => {
      const tree = new Tree(gameStatus);
      const result = tree.getNextId();
      expect(result).toEqual(1);
    });

    it('should return 1 for the root node', () => {
      const tree = new Tree(gameStatus);
      for (let i = 0; i < 1000; i += 1) tree.getNextId();
      const result = tree.getNextId();
      expect(result).toEqual(1001);
    });
  });
});
