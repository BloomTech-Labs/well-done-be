const knex = require("knex");
const config = require("../../knexfile");
const db = require("../../data/dbConfig.js");


function addPump(pump){
    return db('pumps')
            .insert(pump)
            .returning("id")
}


// addds multiple pumps to the database
function addPumps(pumpsArr){
  pumpsArr.forEach(pump => {
    return db('pumps')
    .insert({pump})
  });
}

function findPumps() {
  return db("pumps");
}

function getPumps() {
  return db("pumps")
    .join("organizations", "organizations.id", "pumps.org_id")
    .join("accounts", "pumps.org_id", "accounts.org_id")
    .select(
      "pumps.id",
      "pumps.country_name",
      "pumps.province_name",
      "pumps.commune_name",
      "pumps.district_name",
      "pumps.latitude",
      "pumps.longitude",
      "organizations.id as org_id",
      "organizations.org_name",
      "organizations.headquarter_city",
      "accounts.id as accounts_id",
      "accounts.first_name",
      "accounts.last_name",
      "accounts.email_address",
      "accounts.mobile_number",
      "accounts.super_user",
      "accounts.org_user",
      "accounts.org_admin"
    );
}

function getPumpsByOrgId(id) {
  return db("pumps as p")
    .join("organizations as o", "o.id", "p.org_id")
    .where({ org_id: id });
}

function findById(id) {
  return db("organizations")
    .where({ id })
    .first();
}

function getPumpById(id) {
  return db("pumps")
    .where({ id })
    .then(pumps => pumps[0]);
  // .first
}

function deletePump(id) {
  return db("pumps")
    .where({ id })
    .del();
}

const updatePump = (changes, id) => {
  try {
    return db("pumps")
      .where({ id })
      .update(changes);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
    // addOrg,
    // addAccount,
    // getAccounts,
    // getOrgs,
    addPumps,
    addPump,
    getPumps,
    findPumps,
    getPumpsByOrgId,
    // getPumpsAll,
    getPumpById,
    deletePump,
    updatePump
}

