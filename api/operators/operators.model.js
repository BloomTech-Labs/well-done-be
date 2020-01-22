const knex = require('knex');
const config = require('../../knexfile');
const db = require('../../data/dbConfig.js');

function getOperators() {
	return db('operators');
}

function getOperatorById(id) {
	return db('operators').where({ id });
}

function getAssignedSensors() {
	return db('sensors_and_operators as so')
		.join('sensors as s', 's.physical_id', 'so.sensor_id')
		.join('operators as o', 'o.id', 'so.operator_id')
		.select([
			'so.sensor_id',
			'so.operator_id',
			'o.first_name',
			'o.last_name',
			'o.mobile_number'
		]);
}

function getAssignedSensorsByOperatorId(id) {
	return db('sensors_and_operators as so')
		.join('sensors as s', 's.physical_id', 'so.sensor_id')
		.join('operators as o', 'o.id', 'so.operator_id')
		.where('o.id', id)
		.orderBy('s.physical_id', 'asc')
		.select([
			'so.sensor_id',
			'so.operator_id',
			'o.first_name',
			'o.last_name',
			'o.mobile_number'
		]);
}

function findBy(filter) {
	return db('operators')
		.where(filter)
		.then(res => {
			if (res.length === 0) {
				return 0;
			} else {
				return 1;
			}
		});
}

function insert(operator) {
	return db('operators').insert(operator);
}

function assignOperator(body) {
	return db('sensors_and_operators').insert(body);
}

module.exports = {
	getOperators,
	getOperatorById,
	getAssignedSensors,
	getAssignedSensorsByOperatorId,
	findBy,
	insert,
	assignOperator
};
