exports.up = function(knex) {
	return knex.schema.table('accounts', function(column) {
		column
			.integer('org_id')
			.unsigned()
			.references('id')
			.inTable('organizations')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');
	});
};

exports.down = function(knex) {
	return knex.schema.table('accounts', function(column) {
		column.dropColumn('org_id');
	});
};
