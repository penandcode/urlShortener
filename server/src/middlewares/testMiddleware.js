const test = (req, res, next) => {
    console.log("apple");
    next();
}

module.exports = { test }