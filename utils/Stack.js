// A Stack with a linkedlist implementation using Nodes
//
// Tobias la Fleur
const Node = require('./Node.js')

module.exports = () => {
    var top
    var size = 0

    return {
        push: (item) => {
            let oldTop = top
            top = Node()
            top.setValue(item)
            top.setNext(oldTop)
            size += 1
        },
        pop: () => {
            if(top === undefined) throw Error('Cannot pop from an empty stack')
            let popped = top.getValue()
            top = top.getNext()
            size -= 1
            return popped
        },
        peek: () => { return top },
        size: () => { return size },
        isEmpty: () => { return top === undefined},
    }
}