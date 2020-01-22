exports.up = function(knex) {
	return knex.schema
		.table('accounts', function(column) {
			column.dropColumn('super_user');
			column.dropColumn('org_user');
			column.dropColumn('org_admin');
		})
		.table('accounts', function(column) {
			column.string('role');
		});
};

exports.down = function(knex) {
	return knex.schema
		.table('accounts', function(column) {
			column.dropColumn('role');
		})
		.table('accounts', function(column) {
			column.boolean('super_user').notNullable();
			column.boolean('org_user').notNullable();
			column.boolean('org_admin').notNullable();
		});
};
