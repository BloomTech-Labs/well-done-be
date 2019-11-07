const knex = require("knex");
const config = require("../../knexfile");
const db = require("../../data/dbConfig.js");

function addSensor(sensor) {
  return db("sensors")
    .insert(sensor)
    .returning("id");
}

// function getSensors() {
//   return db("sensors")
//     .join("pumps", "pumps.id", "sensors.pump_id")
//     .join("organizations", "pumps.org_id", "organizations.id")
//     .select(
//       "sensors.id",
//       "sensors.pump_id as pump_id",
//       "sensors.physical_id",
//       "sensors.kind",
//       "sensors.type",
//       "sensors.cellular",
//       "sensors.bluetooth",
//       "sensors.training",
//       "sensors.remark",
//       "sensors.data_finished",
//       "sensors.depth",
//       "sensors.yield",
//       "sensors.static",
//       "sensors.quality",
//       "pumps.country_name",
//       "pumps.province_name",
//       "pumps.commune_name",
//       "pumps.district_name",
//       "organizations.id as org_id",
//       "organizations.org_name",
//       "organizations.headquarter_city"
//     );
// }

function findSensors() {
  return db("sensors");
}

function getSensorById(id) {
  return db("sensors")
    .where({ id })
    .then(sensors => sensors[0]);
}

function getSensorBySensorId(id) {
  return db("sensors as s")
  .join("history as h", "s.physical_id", "h.sensor_id")
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

function getSensorNPump() {
    return db("sensors as s")
    .join("pumps as p", "p.sensor_pid", "s.physical_id")
}

//convert this to promises to return entire object
function getSensorNPumpNHistory() {
    return db("sensors as s")
    .join("pumps as p", "p.sensor_pid", "s.physical_id")
    .join("history as h", "h.sensor_id", "s.physical_id")
}

function findSensorsAndHistories () {
  return db("sensors as s")
  .join("history as h", "s.physical_id", "h.sensor_id")
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
    "h.id as history_index",
    "h.date",
    "h.count",
    "h.total",
    "h.status",
    "h.sensor_id",
    "h.reported_percent"

  ])
}

function findSensorsAndHistoriesBySensorId (id) {
  return db("sensors as s")
  .join("history as h", "s.physical_id", "h.sensor_id")
  .where({sensor_id: id})
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
    "h.id as history_index",
    "h.date",
    "h.count",
    "h.total",
    "h.status",
    "h.sensor_id",
    "h.reported_percent"

  ])
}

module.exports = {
  addSensor,
  // getSensors,
  findSensors,
  getSensorById,
  updateSensor,
  deleteSensor,
  getSensorByOrgId,
  getSensorNPump,
  getSensorNPumpNHistory,
  getSensorBySensorId,
  findSensorsAndHistories,
  findSensorsAndHistoriesBySensorId
}



