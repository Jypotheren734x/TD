/**
 * Created by nick on 6/16/17.
 */
class Node {
    constructor(value, x, y, isWall) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.isWall = isWall;
        this.cost = 0;
        this.estimatedCost = 0;
        this.visited = false;
        this.edges = [];
        this.parent = null;
    }

    calculateCost(node) {
        return Math.abs((this.x - node.x)) + Math.abs((this.y - node.y));
    }
}
class Graph {
    constructor(input) {
        this.nodes = input;
        this.current_node = null;
        this.start = null;
        this.end = null;
        for (let row = 0; row < this.nodes.length; row++) {
            for (let col = 0; col < this.nodes[0].length; col++) {
                if (!this.nodes[row][col].isWall) {
                    this.current_node = this.nodes[row][col];
                    this.buildEdges(this.nodes[row][col]);
                    if (this.nodes[row][col].value === 'e') {
                        this.start = this.nodes[row][col];
                    } else if (this.nodes[row][col].value === 's') {
                        this.end = this.nodes[row][col];
                    }
                }
            }
        }
    }
    buildEdges(n) {
        if (this.getDown() !== undefined){
            if(!this.getDown().isWall) {
                let temp = this.getDown();
                n.edges.push(temp);
            }
        }
        if (this.getUp() !== undefined){
            if(!this.getUp().isWall) {
                let temp = this.getUp();
                n.edges.push(temp);
            }
        }
        if (this.getLeft() !== undefined){
            if(!this.getLeft().isWall) {
                let temp = this.getLeft();
                n.edges.push(temp);
            }
        }
        if (this.getRight() !== undefined){
            if(!this.getRight().isWall) {
                let temp = this.getRight();
                n.edges.push(temp);
            }
        }
    }
    buildPath(){
        let path = [];
        let node = this.end;
        while (node.parent !== null) {
            path.push(node);
            node = node.parent;
        }
        return path;
    }
    getRight() {
        if(this.nodes[this.current_node.y] !== undefined){
            return this.nodes[this.current_node.y][this.current_node.x + 1];
        }else{
            return undefined;
        }
    }
    getLeft() {
        if(this.nodes[this.current_node.y] !== undefined){
            return this.nodes[this.current_node.y][this.current_node.x - 1];
        }else{
            return undefined;
        }
    }
    getUp() {
        if(this.nodes[this.current_node.y - 1] !== undefined){
            return this.nodes[this.current_node.y - 1][this.current_node.x];
        }else{
            return undefined;
        }
    }
    getDown() {
        if(this.nodes[this.current_node.y + 1] !== undefined){
            return this.nodes[this.current_node.y + 1][this.current_node.x];
        }else{
            return undefined;
        }
    }
}
function findPath(input) {
    let nodes = input;
    for(let i = 0; i<input.length; i++){
        for(let j = 0; j<input[i].length; j++){
            if(input[i][j] === 'w' || input[i][j] === 'T') {
                nodes[i][j] = new Node(input[i][j], j, i, true);
                nodes[i][j].cost = -1;
            }else{
                nodes[i][j] = new Node(input[i][j], j, i, false);
            }
        }
    }
    this.graph = new Graph(nodes);
    let queue = [];
    this.graph.start.cost = 0;
    this.graph.start.estimatedCost = this.graph.start.calculateCost(this.graph.end);
    queue.push(this.graph.start);
    while (queue.length > 0) {
        let node = queue.shift();
        if (node === this.graph.end) {
            return this.graph.buildPath();
        }
        let edges = node.edges;
        for (let i = 0; i < edges.length; i++) {
            let edgeNode = edges[i];
            let cost = node.cost + node.calculateCost(edgeNode);
            if ((!queue.includes(edgeNode) && !edgeNode.visited) || cost < edgeNode.cost) {
                edgeNode.parent = node;
                edgeNode.cost = cost;
                edgeNode.estimatedCost = edgeNode.calculateCost(this.graph.end);
                if (edgeNode.visited) {
                    edgeNode.visited = false;
                }
                if (!queue.includes(edgeNode)) {
                    queue.push(edgeNode);
                }
            }
        }
        node.visited = true;
    }
    return null;
}