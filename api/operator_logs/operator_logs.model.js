const knex = require('knex');
const config = require('../../knexfile');
const db = require('../../data/dbConfig.js');

function getAllLogs() {
	return db('sensor_logs as sl')
		.join('sensors as s', 'sl.sensor_id', 's.physical_id')
		.join('pumps as p', 's.physical_id', 'p.sensor_pid')
		.join('organizations as o', 'p.org_id', 'o.id')
		.select([
			'sl.id',
			'sl.date_filed',
			'sl.last_modified',
			'sl.status',
			'sl.comment',
			'sl.operator_id',
			'sl.sensor_id',
			'o.org_name'
		]);
}

function getImages() {
	return db('logs_images');
}

function getLogsByOperatorId(operator_id) {
	return db('sensor_logs').where({ operator_id });
}

function addLog(info) {
	return db('sensor_logs')
		.insert(info)
		.returning('*');
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

function addImage(image) {
	console.log(image);
	return db('logs_images').insert(image);
}
module.exports = {
	getAllLogs,
	getLogsByOperatorId,
	addLog,
	update,
	findById,
	remove,
	addImage,
	getImages
};
