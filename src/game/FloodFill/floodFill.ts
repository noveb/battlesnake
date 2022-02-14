export function floodFill(board: any, x: number, y: number) {
  const queue = [];
  queue.push(board[x][y]);
  let reachableCounter = 0;

  while (queue.length) {
    const targetNode: any = queue.pop();
    const workingNode = board[targetNode.x][targetNode.y];
    if (!workingNode.obstacle) {
      if (!workingNode.reachable) {
        reachableCounter += 1;
        workingNode.reachable = true;
        // rechts
        if (targetNode.x < board.length - 1) {
          const nextNode = board[targetNode.x + 1][targetNode.y];
          if (!nextNode.obstacle) queue.push(nextNode);
        }
        // links
        if (targetNode.x > 0) {
          const nextNode = board[targetNode.x - 1][targetNode.y];
          if (!nextNode.obstacle) queue.push(nextNode);
        }
        // rechts
        if (targetNode.y < board[0].length - 1) {
          const nextNode = board[targetNode.x][targetNode.y + 1];
          if (!nextNode.obstacle) queue.push(nextNode);
        }
        // rechts
        if (targetNode.y > 0) {
          const nextNode = board[targetNode.x][targetNode.y - 1];
          if (!nextNode.obstacle) queue.push(nextNode);
        }
      }
    }
  }
  return { board, reachableCounter };
}

export function initBoard(height: number, width: number, obstacles: { x: number, y: number }[]) {
  const board = new Array(height);
  for (let i = 0; i < height; i += 1) {
    board[i] = new Array(width);
    for (let j = 0; j < width; j += 1) {
      board[i][j] = {
        x: i, y: j, obstacle: false,
      };
    }
  }
  for (let i = 0; i < obstacles.length; i += 1) {
    board[obstacles[i].x][obstacles[i].y].obstacle = true;
  }
  return board;
}
