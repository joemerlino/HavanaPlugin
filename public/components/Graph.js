class Graph {
    constructor() {
        this.nodes = [];
        this.links = [];
    }

    getNodes() {
        return this.nodes;
    }

    addNode(node) {
        this.nodes.push(node);
    }

    getLinks() {
        return this.links;
    }

    addLink(link) {
        this.links.push(link);
    }
}

module.exports = Graph;
