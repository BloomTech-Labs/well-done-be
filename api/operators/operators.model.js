const knex = require('knex');
const config = require('../../knexfile');
const db = require('../../data/dbConfig.js');

function getOperators() {
	return db('operators');
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

module.exports = {
	getOperators,
	findBy,
	insert
};
