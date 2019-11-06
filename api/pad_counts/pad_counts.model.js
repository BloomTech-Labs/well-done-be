const db = require("../../data/dbConfig.js");

function find() {
    return db("pad_counts as p")
}

function add(count) {
    return db("pad_counts")
    .insert(count)
}

function updatePadCounts(current, id) {
    return db("pad_counts")
      .where({ history_id: id })
      .update(current);
  }




module.exports = {
    find,
    add,
    updatePadCounts
}