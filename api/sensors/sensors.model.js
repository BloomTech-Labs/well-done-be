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
  // .join("history as h", "s.physical_id", "h.sensor_id")
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
  .join("pad_counts as pc", "pc.history_id", "h.id")
  .join("pad_seconds as ps", "ps.history_id", "h.id")
  .join("pumps as p", "s.physical_id", "p.sensor_pid")
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
    "p.country_name",
    "p.district_name",
    "p.province_name",
    "p.commune_name",
    "p.latitude",
    "p.longitude",
    "h.id as history_index",
    "h.date",
    "h.count",
    "h.total",
    "h.status",
    "h.sensor_id",
    "h.reported_percent",
    "pc.pad_count_0",
    "pc.pad_count_1",
    "pc.pad_count_2",
    "pc.pad_count_3",
    "ps.pad_seconds_0",
    "ps.pad_seconds_1",
    "ps.pad_seconds_2",
    "ps.pad_seconds_3"

  ])
  .then(res => {
    let compare = []
    let filtered = []

      for (let i = 0; i < res.length; i++) {
    // for (let i = res.length - 1; i >= 0; i--) {
      if (!compare.includes(res[i].physical_id)) {
        compare.push(res[i].physical_id)
        filtered.push(res[i])
      }
    }
    return filtered
  })
}

function getSensorNHistoryByPhysicalId (id) {
  return db("sensors as s")
  .join("pumps as p", "s.physical_id", "p.sensor_pid")
  .where({physical_id: id})
}


function findSensorsAndHistoriesBySensorsPhysicalId (id) {
  return db("sensors as s")
  .join("history as h", "s.physical_id", "h.sensor_id")
  .join("pad_counts as pc", "pc.history_id", "h.id")
  .join("pad_seconds as ps", "ps.history_id", "h.id")
  .join("pumps as p", "s.physical_id", "p.sensor_pid")
  .where({physical_id: id})
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
    "p.country_name",
    "p.district_name",
    "p.province_name",
    "p.commune_name",
    "p.latitude",
    "p.longitude",
    "h.id as history_index",
    "h.date",
    "h.count",
    "h.total",
    "h.status",
    "h.sensor_id",
    "h.reported_percent",
    "pc.pad_count_0",
    "pc.pad_count_1",
    "pc.pad_count_2",
    "pc.pad_count_3",
    "ps.pad_seconds_0",
    "ps.pad_seconds_1",
    "ps.pad_seconds_2",
    "ps.pad_seconds_3"

  ])
  .then(res => {
    let compare = []
    let filtered = []

    for (let i = res.length - 1; i >= 0; i--) {
      if (!compare.includes(res[i].physical_id)) {
        compare.push(res[i].physical_id)
        filtered.push(res[i])
      }
    }
    return filtered
  })
}

// const current = res.map(item => item.sensor_pid)
//         const incoming = Data.pumps.map(item => Number(item.id))

//         let filtered = incoming.filter(item => !current.includes(item))

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
  getSensorNHistoryByPhysicalId,
  findSensorsAndHistoriesBySensorsPhysicalId
}



