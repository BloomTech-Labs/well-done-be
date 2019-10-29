const db = require("../../data/dbConfig.js");

function find() {
    return db("pad_counts")
}


module.exports = {
    find
}