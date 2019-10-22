const knex = require("knex");
const config = require("../../knexfile");
const db = require("../../data/dbConfig.js");

// const db = require("../data/dbConfig.js");

function addSensor(sensor){
    return db('sensors')
            .insert(sensor)
            .returning("id")
}


// function getSensors(){
//     return db('sensors')
//             .join('pumps', 'pumps.id', 'sensors.pump_id')
//             .join('organizations', 'pumps.org_id', 'organizations.id')
//             .select('sensors.*', 'pumps.*', 'organizations.*')
            

// }

const getSensors = () => { 
    try {
       return db('sensors')
            .join('pumps', 'pumps.id', 'sensors.pump_id')
            .join('organizations', 'pumps.org_id', 'organizations.id')
            .select('sensors.*', 'pumps.*', 'organizations.*')
        

    } catch (err) {
        res.status(400).json(err.message)
    }
}

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

module.exports = {
  addSensor,
  getSensors,
  findSensors,
  getSensorById,
  updateSensor,
  deleteSensor,
  getSensorByOrgId
}