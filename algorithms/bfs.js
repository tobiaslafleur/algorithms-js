import { Queue, Sleep } from '../utils/'

const BreadthFirstSearch = async (graph, start, end) => {
    var marked = []
    var edgeTo = []
    var start = start
    var end = end
    var graph = graph  

    const bfs = async () => {
        let found = false
        let queue = Queue()
        marked[start] = true
        queue.enqueue(start)

        while(!queue.isEmpty() && !found) {
            let v = queue.dequeue()
            await Sleep(5)

            if(v !== end) {
                var element = document.getElementById('node-' + v)
                element.classList.add('marked')
                element.classList.remove('unmarked')
            } else {
                found = true
            }

            graph.adjacentEdges(v).map((w) => {
                if(!marked[w]) {
                    edgeTo[w] = v
                    marked[w] = true
                    queue.enqueue(w)
                }
            })
        }
        await _pathTo()
    }

    const _pathTo = async () => {
        if(!_hasPathTo(end)) return undefined
        for(let x = end; x != start; x = edgeTo[x]) {
            await Sleep(50)
            if(x !== end) {
                let element = document.getElementById('node-' + x)
                element.classList.remove('marked')
                element.classList.add('path')
            }
        }
    }
    
    const _hasPathTo = (v) => {
        if(marked[v]) return true
        else return false
    }

    await bfs()
}

export default BreadthFirstSearch