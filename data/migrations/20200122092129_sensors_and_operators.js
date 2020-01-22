exports.up = function(knex) {
	return knex.schema
		.alterTable('sensors', function(column) {
			column
				.integer('physical_id')
				.unique()
				.alter();
		})
		.createTable('operators', function(column) {
			column.increments();
			column.string('first_name');
			column.string('last_name');
			column.string('email_address').unique();
			column.string('mobile_number').unique();
			column.string('password').notNullable();
		})
		.createTable('sensor_logs', function(column) {
			column.increments();
			column.timestamp('created_at').defaultTo(knex.fn.now());
			column.string('updated_at');
			column.integer('status');
			column.string('comment');
			column.string('pictures');
			column
				.integer('operator_id')
				.unsigned()
				.references('id')
				.inTable('operators')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		})
		.createTable('sensors_and_operators', function(column) {
			column.increments();
			column
				.integer('sensor_id')
				.unsigned()
				.references('physical_id')
				.inTable('sensors')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			column
				.integer('operator_id')
				.unsigned()
				.references('id')
				.inTable('operators')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists('sensors_and_operators')
		.dropTableIfExists('sensor_logs')
		.dropTableIfExists('operators')
		.alterTable('sensors', function(column) {
			column.dropUnique('physical_id');
		});
};
