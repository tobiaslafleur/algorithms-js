// A Queue with a linkedlist implementation using Nodes
//
// Tobias la Fleur
const Node = require('./Node.js')

module.exports = () => {
    var first
    var last
    var size = 0

    return {
        enqueue: (item) => {
            let oldLast = last
            last = Node()
            last.setValue(item)
            if(first === undefined) first = last
            else oldLast.setNext(last)
            size += 1
        },
        dequeue: () => {
            if(first === undefined) throw Error('Cannot dequeue from an empty queue')
            let oldFirst = first.getValue()
            first = first.getNext()
            if(first === undefined) last = undefined
            size -= 1
            return oldFirst
        },
        size: () => { return size },
        isEmpty: () => { return first === undefined },
    }
}