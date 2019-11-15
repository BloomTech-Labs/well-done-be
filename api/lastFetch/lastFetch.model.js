const db = require("../../data/dbConfig.js");

function find() {
  return db("last_fetch")
}


module.exports = { find };