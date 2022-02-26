import { GameStatus } from '../../shared/types';

export default class Node {
  id: number;

  state: GameStatus;

  parent?: Node;

  children?: Node[];

  constructor(
    id: number,
    state: GameStatus,
    parent?: Node,
    children?: Node[],
  ) {
    this.id = id;
    this.state = state;
    this.parent = parent;
    this.children = children;
  }

  isLeaf() {
    return !this.children?.length;
  }

  hasChildren() {
    return !!this.children?.length;
  }
}
