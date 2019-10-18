const knex = require("knex");
const config = require("../../knexfile");
const db = require("../../data/dbConfig.js");

// const db = require("../data/dbConfig.js");



function addSensor(sensor){
    return db('sensors')
            .insert(sensor)
            .then(ids => ({id: ids[0]}))
}


function getSensors(){
    return db('sensors')
            .join('pumps', 'pumps.id', 'sensors.pump_id')
            .join('organizations', 'pumps.org_id', 'organizations.id')
            .select('sensors.*', 'pumps.*', 'organizations.*')

}

function getSensorById(id){
    return db('sensors')
            .where({id})
            .then(sensors => (sensors[0]))

}

function getSensorByOrgName(filter){
    return db('sensors')
            .join('pumps', 'sensors.pump_id', 'pumps.id')
            .join('organizations', 'pumps.org_id', 'organizations.id')
            .where('organizations.org_name', filter)
            .select('sensors.*s')
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
  getSensorById,
  updateSensor,
  deleteSensor,
  getSensorByOrgName
}