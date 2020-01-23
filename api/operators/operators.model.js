const knex = require('knex');
const config = require('../../knexfile');
const db = require('../../data/dbConfig.js');

function getOperators() {
	return db('operators');
}

function getOperatorById(id) {
	console.log(id);
	return db('operators')
		.where({ id })
		.select([
			'id',
			'first_name',
			'last_name',
			'email_address',
			'mobile_number'
		]);
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
		.join('pumps as p', 's.physical_id', 'p.sensor_pid')
		.orderBy('s.physical_id', 'asc')
		.select([
			'so.sensor_id',
			'so.operator_id',
			's.data_finished',
			's.depth',
			'p.district_name',
			'p.commune_name',
			'p.province_name',
			'p.country_name',
			'p.latitude',
			'p.longitude'
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

async function assignOperator(body) {
	let tableLength = await db('sensors_and_operators');
	tableLength = tableLength.length + 1;
	body = { id: tableLength, ...body };
	return db('sensors_and_operators').insert(body, 'id');
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
