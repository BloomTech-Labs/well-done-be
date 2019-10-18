const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

// const db = require("../data/dbConfig.js");

<<<<<<< HEAD:api/sensors/sensor.model.js
module.exports = {
    addSensor,
    getSensors,
    getSensorById,
    updateSensor,
    deleteSensor,
    getSensorByOrgName
}

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

=======
function findAll() {
  return db("sensors");
}

module.exports = {
  findAll
};
>>>>>>> 1878a7f0af80023950bf70c0a648cc595b6ab9ad:api/sensors/sensors.model.js
