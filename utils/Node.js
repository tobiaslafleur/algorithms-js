// A node containing a value and a pointer to the next Node
//
// Tobias la Fleur 2022
module.exports = () => {
    var value
    var next

    return {
        getValue: () => { return value },
        setValue: (newValue) => { value = newValue },
        getNext: () => { return next },
        setNext: (newNext) => { next = newNext },
    }
}