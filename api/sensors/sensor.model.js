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
    return db('sensor')

}


function getSensors(){
    return db('sensor')

}

function getSensorById(){
    return db('sensor')

}

function updateSensor(){
    return db('sensor')

}

function deleteSensor(){
    return db('sensor')

}

function getSensorByOrgName(){
    return db('sensor')

}