 // A stack with a linkedlist implementation
 //
 // Tobias la Fleur
const Node = require('./Node.js')

module.exports = () => {
    var top
    var size = 0

    return {
        functions: '',
        push: (item) => {
            let oldTop = top
            top = Node()
            top.setValue(item)
            top.setNext(oldTop)
            size += 1
        },
        pop: () => {
            if(top === undefined) throw Error('Cannot pop from an empty stack')
            let temp = top
            top = top.getNext()
            size -= 1
            return temp
        },
        peek: () => {
            return top
        },
        size: () => {
            return size
        },
    }
}