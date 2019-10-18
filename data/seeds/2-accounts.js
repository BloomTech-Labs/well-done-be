const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex('accounts').del().then(function () {
		// Inserts seed entries
		return knex('accounts').insert([
			// id 1
			{
				org_id: 1,
				first_name: 'Tester',
				last_name: 'McGee',
				email_address: 'email1@email.com',
				password: bcrypt.hashSync('password', 2),
				mobile_number: '1-888-888-8888',
				super_user: true,
				org_user: false,
				org_admin: false
			},
			// id 2
			{
				org_id: 2,
				first_name: 'Rick',
				last_name: 'Morty',
				email_address: 'email2@email.com',
				password: bcrypt.hashSync('hi', 2),
				mobile_number: '1-888-888-8888',
				super_user: true,
				org_user: false,
				org_admin: false
			},
			// id 3
			{
				org_id: 3,
				first_name: 'Pepperoni',
				last_name: 'Pizza',
				email_address: 'pizza@email.com',
				password: bcrypt.hashSync('hiya', 2),
				mobile_number: '1-888-888-8888',
				super_user: true,
				org_user: false,
				org_admin: false
			}
		]);
	});
};
