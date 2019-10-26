const knex = require("knex");
const config = require("../../knexfile");
const db = require("../../data/dbConfig.js");

// const db = require("../data/dbConfig.js");

function addSensor(sensor){
    return db('sensors')
            .insert(sensor)
            .returning("id")
}


function getSensors(){
    return db('sensors')
            .join('pumps', 'pumps.id', 'sensors.pump_id')
            .join('organizations', 'pumps.org_id', 'organizations.id')
            .select(
                'sensors.id',
                'sensors.pump_id as pump_id', 
                'sensors.physical_id', 
                'sensors.kind', 
                'sensors.type', 
                'sensors.cellular', 
                'sensors.bluetooth', 
                'sensors.training', 
                'sensors.remark', 
                'sensors.data_finished',
                'sensors.depth',
                'sensors.yield',
                'sensors.static',
                'sensors.quality',
                'pumps.country_name',
                'pumps.province_name',
                'pumps.commune_name',
                'pumps.district_name',
                'organizations.id as org_id',
                'organizations.org_name',
                'organizations.headquarter_city'
          
            )
}

// sensor_id: eachSensor.id,
// physical_id: eachSensor.physical_id,
// kind: eachSensor.kind,
// type: eachSensor.type,
// cellular: eachSensor.cellular,
// bluetooth: eachSensor.bluetooth,
// training: eachSensor.training,
// remark: eachSensor.remark,
// data_finished: eachSensor.data_finished,
// depth: eachSensor.depth,
// yield: eachSensor.yield,
// static: eachSensor.static,
// quality: eachSensor.quality,
// level_dynamic: eachSensor.level_dynamic,
// pump: {
//     pump_id: eachSensor.pump_id,
//     country_name: eachSensor.country_name,
//     province_name: eachSensor.province_name,
//     commune_name: eachSensor.commune_name,
//     district_name: eachSensor.district_name,
//     organization: {
//         org_name: eachSensor.org_name,
//         headquarter_city: eachSensor.headquarter_city


// const getSensors = () => { 
//     try {
//        return db('sensors')
//             .join('pumps', 'pumps.id', 'sensors.pump_id')
//             .join('organizations', 'pumps.org_id', 'organizations.id')
//             .select('sensors.*', 'pumps.*', 'organizations.*')
        

//     } catch (err) {
//         res.status(400).json(err.message)
//     }
// }

function findSensors() {
    return db('sensors')
  }

function getSensorById(id){
    return db('sensors')
            .where({id})
            .then(sensors => (sensors[0]))

}

function getSensorByOrgId(org_id){
    return db('sensors')
            .join('pumps', 'sensors.pump_id', 'pumps.id')
            .where('pumps.org_id', org_id)
            .then(sensors => (sensors[0]))
}

function updateSensor(id, change){
    return db('sensors')
            .where({id})
            .update(change)
}

function deleteSensor(id){
    return db('sensors')
            .where({id})
            .del()
}

function getSensorNPump() {
    return db("sensors as s")
    .join("pumps as p", "p.sensor_ID", "s.physical_id")
}

function getSensorNPumpNHistory() {
    return db("sensors as s")
    .join("pumps as p", "p.sensor_ID", "s.physical_id")
    .join("history as h", "h.sensor_id", "s.physical_id")
}

module.exports = {
  addSensor,
  getSensors,
  findSensors,
  getSensorById,
  updateSensor,
  deleteSensor,
  getSensorByOrgId,
  getSensorNPump,
  getSensorNPumpNHistory
}



