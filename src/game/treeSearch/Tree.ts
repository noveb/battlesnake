/* eslint-disable no-restricted-syntax */
import { GameStatus } from '../../shared/types';
import Node from './Node';

export default class Tree {
  private idSequence: number = 0;

  root: Node;

  constructor(state: GameStatus) {
    this.root = new Node(
      this.getNextId(),
      state,
      undefined,
      [],
    );
  }

  getNextId() {
    // eslint-disable-next-line no-plusplus
    return this.idSequence++;
  }

  * preOrderTraversal(node = this.root): any {
    yield node;
    if (node.children?.length) {
      for (const child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  * postOrderTraversal(node = this.root): any {
    if (node.children?.length) {
      for (const child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(parent: number | Node, state: GameStatus) {
    const parentId: number = parent instanceof Node ? parent.id : parent;
    for (const node of this.preOrderTraversal()) {
      if (node.id === parentId) {
        node.children.push(new Node(this.getNextId(), state, node));
        return true;
      }
    }
    return false;
  }

  remove(id: number) {
    for (const node of this.preOrderTraversal()) {
      const filtered = node.children.filter((child: Node) => child.id !== id);
      if (filtered.length !== node.children.length) {
        node.children = filtered;
        return true;
      }
    }
    return false;
  }

  find(id: number) {
    for (const node of this.preOrderTraversal()) {
      if (node.id === id) return node;
    }
    return undefined;
  }
}
