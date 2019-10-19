const knex = require("knex");
const config = require("../../knexfile");
const db = require("../../data/dbConfig.js");



function addPump(pump){
    return db('pumps')
            .insert(pump)
            .then(ids => ({id:ids[0]}))
}


function getPumps() {
    return db('pumps')
            .join('organizations', 'organizations.id', 'pumps.org_id')
            .join('accounts', 'pumps.org_id', 'accounts.org_id')
            .select('pumps.id','pumps.country_name','pumps.province_name', 'pumps.commune_name','pumps.district_name', 'pumps.latitude', 'pumps.longitude', 
                    'organizations.id as org_id', 'organizations.org_name', 'organizations.headquarter_city', 
                    'accounts.id as accounts_id', 'accounts.first_name', 'accounts.last_name', 'accounts.email_address', 'accounts.mobile_number', 'accounts.super_user', 'accounts.org_user', 'accounts.org_admin')

}


// {
//     "org_name"= "2LAVON ORG",
//     "headquarter_city" = "2Paris"
//   }

// function getCountry(id) {
//   return db("users as u")
//     .select("c.country_name")
//     .join("stories as s", "u.id", "s.user_id")
//     .join("countries as c", "s.country_id", "c.id")
//     .where({ user_id: id });
// }

// function find() {
//   return db("pumps")
//     .join("organizations", "org.id", "pumps.org_id")
//     .join("accounts", "pumps.org_id", "accounts.org_id")
//     .select(
//       "pumps.id",
//       "pumps.country_name",
//       "pumps.province_name",
//       "pumps.commune_name",
//       "pumps.district_name",
//       "pumps.latitude",
//       "pumps.longitude",
//       "organizations.id",
//       "organizations.organization_name",
//       "organizations.headquarter_city",
//       "accounts.id",
//       "accounts.first_name",
//       "accounts.last_name",
//       "accounts.email_address",
//       "accounts.mobile_number"
//     );
// }

function getPumpById(id) {
  return db("pumps")
    .where({ id })
    .then(pumps => pumps[0]);
  // .first
}

function deletePump(id) {
    return db("pumps")
        .where({id})
        .del()
}

function updatePump(id, change) {
  return db("pumps")
    .where({ id })
    .update(change)
}

module.exports = {
    // addOrg,
    // addAccount,
    // getAccounts,
    // getOrgs,
    addPump,
    getPumps,
    // getPumpsAll,
    getPumpById,
    deletePump,
    updatePump
}

