// Graph implementation with Adjacency List
//
// Tobias la Fleur
module.exports = (totalVertices) => {
    var vertices = totalVertices
    var edges = 0
    var adjacent = []

    for(let i = 0; i < totalVertices; i++) adjacent[i] = []

    function _adjacencyList() {
        let list = []

        for(let i = 0; i < adjacent.length; i++) {
            list.push({ vertex: i, adjacent: adjacent[i] })
        }

        return list
    }

    function _checkVertex(v) {
        if(v < 0 || v > totalVertices) throw Error('Edge does not exist')
    }

    return {
        vertices: () => { return vertices },
        edges: () => { return edges },
        addEdge: (v, w) => {
            _checkVertex(v)
            _checkVertex(w)
            adjacent[v].push(w)
            adjacent[w].push(v)
            edges += 1
        },
        adjacent: (v) => { return adjacent[v] },
        adjacencyList: () => { return _adjacencyList() },
    }
}