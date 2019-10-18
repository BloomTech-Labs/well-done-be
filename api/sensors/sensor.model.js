const knex = require("knex");
const config = require("../../knexfile");
const db = knex(config.development);

// const db = require("../data/dbConfig.js");

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

function getSensorById(){
    return db('sensors')

}

function updateSensor(){
    return db('sensors')

}

function deleteSensor(){
    return db('sensors')

}

function getSensorByOrgName(){
    return db('sensors')

}