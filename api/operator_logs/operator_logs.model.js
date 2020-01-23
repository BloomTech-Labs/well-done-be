const knex = require('knex');
const config = require('../../knexfile');
const db = require('../../data/dbConfig.js');

function getLogs() {
	return db('sensor_logs');
}

function getLogsByOperatorId(operator_id) {
	return db('sensor_logs').where({ operator_id });
}

function addLog(info) {
	return db('sensor_logs').insert(info);
}

function findById(id) {
	return db('sensor_logs').where({ id });
}

function update(id, info) {
	return db('sensor_logs')
		.where({ id }, 'id')
		.update(info);
}

function remove(id) {
	return db('sensor_logs')
		.where({ id }, 'id')
		.del();
}
module.exports = {
	getLogs,
	getLogsByOperatorId,
	addLog,
	update,
	findById,
	remove
};
