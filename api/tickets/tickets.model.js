const db = require('../../data/dbConfig.js');

function find() {
	return db('tickets');
}

module.exports = {
	find
};
