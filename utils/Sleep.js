// A function that sleeps the method
//
// Tobias la Fleur

module.exports = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}