const knex = require("knex");
const config = require("../../knexfile");
// const db = knex(config.development);

const db = require("../data/dbConfig.js");

function findAll() {
  return db("sensors");
}

module.exports = {
  findAll
};
