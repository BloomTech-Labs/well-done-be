const db = require("../../data/dbConfig.js");

function find() {
    return db("pad_seconds")
}


module.exports = {
    find
}