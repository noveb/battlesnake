const Node = require('./Node');

class Graph {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.grid = [];
        this.init();
    }

    init() {
        for (let w = 0; w < this.width; w++) {
            this.grid.push([]);

            for (let h = 0; h < this.height; h++) {
                const node = new Node(w, h, 0);
                this.grid[w][h] = node;
                this.nodes.push(node);
            }
        }
    }

    setUnwalkables(list) {
        for (const item of list) {
            this.grid[item.x][item.y].desire = Number.NEGATIVE_INFINITY;
        }
    }

    setDesire(list) {
        for (const item of list) {
            this.grid[item.x][item.y].desire += item.desire;
        }
    }
}

exports = Graph;
