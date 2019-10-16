const knex = require("knex");
const config = require("../../knexfile");

const db = require("../../data/dbConfig.js");

function find() {
return db("accounts").select("id", "email_address", "password");
}

function findBy(filter) {
  return db("accounts").where(filter);
}

async function add(account) {
  const [id] = await db("accounts").insert(account).returning('id');

  return findById(id);
}

function findById(id) {
  return db("accounts")
    .where({ id })
    .first();
}

module.exports = { find, findBy, add, findById}