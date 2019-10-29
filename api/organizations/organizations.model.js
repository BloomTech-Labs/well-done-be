const knex = require("knex");
const config = require("../../knexfile");

const db = require("../../data/dbConfig.js");

// get ALL orgs (for superUsers)
function findAll() {
  return db("organizations");
}

function findAllAndData() {
  return db("organizations as o")
    .join("accounts as a", "a.id", "o.org_id")
    .join("pumps as p", "o.id", "p.org_id")
    .join("sensors as s", "o.id", "s.org_id");
}

function findByOrgName(org_name) {
  return db("organizations as o")
    .where({ org_name })
    .join("accounts as a", "a.id", "o.org_id")
    .join("pumps as p", "o.id", "p.org_id")
    .join("sensors as s", "o.id", "s.org_id");
}

function update(changes, id) {
  try {
    return db("organizations")
      .where({ id })
      .update(changes);
  } catch (err) {
    console.log(err.message);
  }
}

function findById(id) {
  return db("organizations")
    .where({ id })
    .first();
}

async function insert(user) {
  const [id] = await db("organizations")
    .insert(user)
    .returning("id");

  return findById(id);
}
const remove = id => {
  return db("organizations")
    .where({ id })
    .del();
};

module.exports = {
  findAll,
  findById,
  findAllAndData,
  findByOrgName,
  update,
  remove,
  insert
};
