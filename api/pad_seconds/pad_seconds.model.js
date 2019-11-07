const db = require("../../data/dbConfig.js");

function find() {
    return db("pad_seconds")
}

function findById(id) {
    return db("pad_seconds")
    .where({history_id: id})
 
 }


module.exports = {
    find,
    findById
}