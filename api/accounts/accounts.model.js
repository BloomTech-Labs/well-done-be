const knex = require('knex');
const config = require('../../knexfile');
const db = require('../../data/dbConfig.js');

//* get all accounts
const find = () => {
	try {
		return db('accounts').select('*');
	} catch (err) {
		console.log(err.message);
	}
};

function findBy(filter) {
	return db('accounts')
		.where(filter)
		.then(res => {
			if (res.length === 0) {
				return 0;
			} else {
				return 1;
			}
		});
}

//* get account by id
const findById = id => {
	try {
		return db('accounts')
			.select([
				'id',
				'first_name',
				'last_name',
				'email_address',
				'mobile_number',
				'role'
			])
			.where({ id })
			.first();
	} catch (err) {
		console.log(err.message);
	}
};

//* create account
const insert = async account => {
	try {
		return db('accounts').insert(account);
	} catch (err) {
		console.log(err);
	}
};

//* update account

const update = async (id, changes) => {
	try {
		return db('accounts')
			.where({ id })
			.first()
			.update(changes);
	} catch (err) {
		console.log(err);
		return err;
	}
};

const remove = async id => {
	try {
		return db('accounts')
			.where({ id })
			.first()
			.del();
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = {
	find,
	findBy,
	findById,
	insert,
	update,
	remove
};
