const knex = require('knex');
const config = require('../../knexfile');
const db = require('../../data/dbConfig.js');

function find() {
	return db('sensors_and_operators');
}

module.exports = {
	find
};
