import { Digraph, Queue } from '../utils/'

module.exports = (grid, start, end) => {
    var marked = []
    var edgeTo = []
    var start = start
    var end = end
    const graph = Digraph(grid.length * grid[0].length)

    for(let row = 0; row < grid.length; row++) {
        for(let col = 0; col < grid[0].length; col++) {
            if(grid[row - 1] !== undefined) graph.addEdge(grid[row][col].id, grid[row - 1][col].id)
            if(grid[row + 1] !== undefined) graph.addEdge(grid[row][col].id, grid[row + 1][col].id)
            if(grid[row][col - 1] !== undefined) graph.addEdge(grid[row][col].id, grid[row][col - 1].id)
            if(grid[row][col + 1] !== undefined) graph.addEdge(grid[row][col].id, grid[row][col + 1].id)
        }
    }  

    const _hasPathTo = (v) => {
        if(marked[v]) return true
        else return false
    }

    const _pathTo = async () => {
        if(!_hasPathTo(end)) return undefined
        for(let x = end; x != start; x = edgeTo[x]) {
            await _sleep(50)
            if(x !== end) {
                let element = document.getElementById('node-' + x)
                element.classList.remove('marked')
                element.classList.add('path')
            }
        }
    }

    const _sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return {
        bfs: async () => {
            let found = false
            let queue = Queue()
            marked[start] = true
            queue.enqueue(start)

            while(!queue.isEmpty() && !found) {
                let v = queue.dequeue()
                await _sleep(5)
                graph.adjacentEdges(v).map((w) => {
                    if(!marked[w]) {
                        edgeTo[w] = v
                        marked[w] = true
                        if(w !== end) {
                            var element = document.getElementById('node-' + w)
                            element.classList.add('marked')
                            element.classList.remove('unmarked')
                        } else {
                            found = true
                        }
                        queue.enqueue(w)
                    }
                })
            }

            _pathTo()
        },
    }
}