// A node containing a value and a pointer to the next Node
//
// Tobias la Fleur 2022
const Node = () => {
    var value
    var next

    return {
        functions: 'Available functions for a Node are getValue(), setValue(), getNext() and setNext()',
        getValue: () => { return value },
        setValue: (newValue) => { value = newValue },
        getNext: () => { return next },
        setNext: (newNext) => { next = newNext }
    }
}

module.exports = Node