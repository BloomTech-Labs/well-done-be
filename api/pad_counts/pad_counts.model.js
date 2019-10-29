const db = require("../../data/dbConfig.js");

function find() {
    return db("pad_counts")
}

function add(count) {
    return db("pad_counts")
    .insert(count)
}


module.exports = {
    find,
    add
}