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
  return db("pumps as p")
  .join("organizations as o", "o.id", "p.org_id")
  .select(
    "p.id",
    "p.org_id",
    "p.country_name as village_name",
    "p.province_name",
    "p.commune_name",
    "p.district_name",
    "p.latitude",
    "p.longitude",
    "o.org_name",
    "o.headquarter_city"
  )
}

// function getPumps() {
//   return db("pumps")
//     .join("organizations", "organizations.id", "pumps.org_id")
//     .join("accounts", "pumps.org_id", "accounts.org_id")
//     .select(
//       "pumps.id",
//       "pumps.country_name",
//       "pumps.province_name",
//       "pumps.commune_name",
//       "pumps.district_name",
//       "pumps.latitude",
//       "pumps.longitude",
//       "organizations.org_name",
//       "organizations.headquarter_city",
//       "accounts.id as accounts_id",
//       "accounts.first_name",
//       "accounts.last_name",
//       "accounts.email_address",
//       "accounts.mobile_number",
//       "accounts.super_user",
//       "accounts.org_user",
//       "accounts.org_admin"
//     );
// }

function getPumpsByOrgId(id) {
  return db("pumps as p")
    .join("organizations as o", "o.id", "p.org_id")
    .join("sensors as s", "s.physical_id", "p.sensor_pid")
    .where({ org_id:id })
    .select([
      "s.id as sensor_index",
      "s.physical_id",
      "s.kind",
      "s.type",
      "s.cellular",
      "s.bluetooth",
      "s.training",
      "s.remark",
      "s.data_finished",
      "s.depth",
      "s.yield",
      "s.static",
      "s.quality",
      "p.id as pump_index",
      "p.sensor_pid",
      "p.org_id",
      "o.org_name",
      "o.headquarter_city",
      "p.country_name as village_name",
      "p.district_name",
      "p.province_name",
      "p.commune_name",
      "p.latitude",
      "p.longitude",
    ])
    
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

const getPumpsByVillageName = (filter) => {
  return db("pumps as p")
  .join("organizations as o", "o.id", "p.org_id")
  .join("sensors as s", "s.physical_id", "p.sensor_pid")
  .where(filter)
  .select([
    "p.id as pump_index",
    "p.org_id",
    "p.sensor_pid",
    "p.country_name as village_name",
    "p.province_name",
    "p.district_name",
    "p.commune_name",
    "p.latitude",
    "p.longitude",
    "o.org_name",
    "o.headquarter_city",
    "s.id as sensor_index",
    "s.physical_id",
    "s.kind",
    "s.type",
    "s.cellular",
    "s.bluetooth",
    "s.training",
    "s.remark",
    "s.data_finished",
    "s.depth",
    "s.yield",
    "s.static",
    "s.quality",
  ])
}

module.exports = {
    addPumps,
    addPump,
    // getPumps,
    findPumps,
    getPumpsByOrgId,
    getPumpById,
    deletePump,
    updatePump,
    getPumpsByVillageName
}

