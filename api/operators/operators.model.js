const knex = require('knex');
const config = require('../../knexfile');
const db = require('../../data/dbConfig.js');
const moment = require('moment');

function getOperators() {
	return db('operators');
}

function getOperatorById(id) {
	console.log(id);
	return db('operators')
		.where({ id })
		.select(['id', 'first_name', 'last_name', 'email_address', 'mobile_number'])
		.first();
}
function getOperatorByEmail(email_address) {
	return db('operators')
		.where({ email_address })
		.select(['id', 'first_name', 'last_name', 'email_address', 'mobile_number'])
		.first();
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

async function getAssignedSensorsByOperatorId(id) {
	//getting all sensors associated with the id of the operator and their info
	let getSensorsInfo = await db('sensors_and_operators as so')
		.join('sensors as s', 's.physical_id', 'so.sensor_id')
		.join('operators as o', 'o.id', 'so.operator_id')
		.where('o.id', id)
		.join('pumps as p', 's.physical_id', 'p.sensor_pid')
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

	return getSensorsInfo;
}

function findBy(filter) {
	return db('operators').where(filter);
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

async function updateOp(id, body) {
	await db('operators')
		.update(body)
		.where({ id });

	let foundOp = await db('operators')
		.join('organizations as org', 'org.id', 'operators.org_id')
		.where('operators.id', id)
		.select([
			'first_name',
			'last_name',
			'email_address',
			'mobile_number',
			'org_id',
			'org_name'
		])

		.first();

	return foundOp;
}

function removeOp(id) {
	return db('operators')
		.where({ id }, 'id')
		.del();
}

module.exports = {
	getOperators,
	getOperatorById,
	getAssignedSensors,
	getAssignedSensorsByOperatorId,
	findBy,
	insert,
	assignOperator,
	updateOp,
	removeOp,
	getOperatorByEmail
};
