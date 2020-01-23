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

async function getAssignedSensorsByOperatorId(id) {
	let operator_id = id;

	let today = new Date();
	today = moment(today).format('ddd MMM D YYYY');

	//getting all sensors associated with the id of the operator and their info
	let getSensorsInfo = await db('sensors_and_operators as so')
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

	//getting just the sensor id
	let getSensors = await db('sensors_and_operators as so')
		.where({ operator_id })
		.select(['so.sensor_id']);

	//getting history
	let recentHistory = await db('history');

	//filtering out all entries not associated with the sensors assigned to the operator or the current date
	recentHistory = recentHistory.filter(history => {
		return getSensors.find(sensor => {
			if (
				history.sensor_id === sensor.sensor_id &&
				(history.date === today || history.date === null)
			) {
				return history;
			}
		});
	});

	let sensorHistoryAndInfo = [];

	//creating a new object with both relevant information and recent information
	getSensorsInfo.forEach(sensorInfo => {
		recentHistory.forEach(history => {
			if (history.sensor_id === sensorInfo.sensor_id) {
				sensorHistoryAndInfo = [
					...sensorHistoryAndInfo,
					{ ...history, ...sensorInfo }
				];
			}
		});
	});

	return sensorHistoryAndInfo;
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
