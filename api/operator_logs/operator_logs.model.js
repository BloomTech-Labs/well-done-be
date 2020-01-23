const knex = require('knex');
const config = require('../../knexfile');
const db = require('../../data/dbConfig.js');

function getLogs() {
	return db('sensor_logs');
}

function addLog(info) {
	return db('sensor_logs').insert(info);
}
module.exports = { getLogs, addLog };
