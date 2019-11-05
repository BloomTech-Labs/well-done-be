const knex = require("knex");
const config = require("../../knexfile");
const db = require("../../data/dbConfig.js");

function addSensor(sensor) {
  return db("sensors")
    .insert(sensor)
    .returning("id");
}

function getSensors() {
  return db("sensors")
    .join("pumps", "pumps.id", "sensors.pump_id")
    .join("organizations", "pumps.org_id", "organizations.id")
    .select(
      "sensors.id",
      "sensors.pump_id as pump_id",
      "sensors.physical_id",
      "sensors.kind",
      "sensors.type",
      "sensors.cellular",
      "sensors.bluetooth",
      "sensors.training",
      "sensors.remark",
      "sensors.data_finished",
      "sensors.depth",
      "sensors.yield",
      "sensors.static",
      "sensors.quality",
      "pumps.country_name",
      "pumps.province_name",
      "pumps.commune_name",
      "pumps.district_name",
      "organizations.id as org_id",
      "organizations.org_name",
      "organizations.headquarter_city"
    );
}

function findSensors() {
  return db("sensors");
}

function getSensorById(id) {
  return db("sensors")
    .where({ id })
    .then(sensors => sensors[0]);
}

// function getSensorBySensorId(id) {
//   return db("sensors")
//   .where({ physical_id: id })

// }

function getSensorBySensorId(id) {
  return db("sensors as s")
  .join("history as h", "s.physical_id", "h.sensor_id")
  .join("pad_counts as c", "c.history_id", "h.id")
  .join("pad_seconds as p", "p.history_id", "h.id")
  .where({ physical_id: id })

}

function getSensorByOrgId(org_id) {
  return db("sensors")
    .join("pumps", "sensors.pump_id", "pumps.id")
    .where("pumps.org_id", org_id)
    .then(sensors => sensors[0]);
}

function updateSensor(id, change) {
  return db("sensors")
    .where({ id })
    .update(change);
}

function deleteSensor(id) {
  return db("sensors")
    .where({ id })
    .del();
}

// function getSensorNPump() {
//     return db("sensors as s")
//     .join("pumps as p", "p.sensor_ID", "s.physical_id")
// }

//convert this to promises to return entire object
// function getSensorNPumpNHistory() {
//     return db("sensors as s")
//     .join("pumps as p", "p.sensor_ID", "s.physical_id")
//     .join("history as h", "h.sensor_id", "s.physical_id")
// }

module.exports = {
  addSensor,
  getSensors,
  findSensors,
  getSensorById,
  updateSensor,
  deleteSensor,
  getSensorByOrgId,
  // getSensorNPump,
  // getSensorNPumpNHistory,
  getSensorBySensorId
}



