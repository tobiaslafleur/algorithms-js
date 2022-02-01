import { Stack, Sleep } from "../utils"

const DepthFirstSearch = async (graph, start, end) => {
    var marked = []
    var path = Stack()
    var start = start
    var end = end
    var graph = graph

    const dfs = async () => {
        let found = false
        let stack = Stack()
        stack.push(start)

        while(!stack.isEmpty() && !found) {
            let v = stack.pop()
            if(!marked[v]) {
                await Sleep(2)
                marked[v] = true

                if(v !== end) {
                    path.push(v)
                    var element = document.getElementById('node-' + v)
                    element.classList.add('marked')
                    element.classList.remove('unmarked')
                } else {
                    found = true
                }

                graph.adjacentEdges(v).map(async (w) => {
                    stack.push(w)
                })
            }
        }

        await _pathTo()
        console.log('i am done')
    }

    const _pathTo = async () => {
        const size = path.size()

        for(let i = 0; i < size; i++) {
            let v = path.pop()
            await Sleep(2)
            let element = document.getElementById('node-' + v)
            element.classList.remove('marked')
            element.classList.add('path')
        }
    }

    await dfs()
}

export default DepthFirstSearch