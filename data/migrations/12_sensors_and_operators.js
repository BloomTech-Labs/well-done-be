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
			column
				.string('email_address')
				.unique()
				.notNullable();
			column.string('mobile_number').unique();
			column.string('password').notNullable();
			column
				.integer('org_id')
				.unsigned()
				.references('id')
				.inTable('organizations')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
				.notNullable();
		})
		.createTable('sensor_logs', function(column) {
			column.increments();
			column.timestamp('date_filed').defaultTo(knex.fn.now());
			column.string('last_modified');
			column.integer('status');
			column.string('comment', [1000]);
			column
				.integer('operator_id')
				.unsigned()
				.references('id')
				.inTable('operators')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
				.notNullable();
			column
				.integer('sensor_id')
				.unsigned()
				.references('physical_id')
				.inTable('sensors')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
				.notNullable();
		})
		.createTable('sensors_and_operators', function(column) {
			column.increments();
			column.unique(['sensor_id', 'operator_id']);
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
		})
		.createTable('logs_images', function(column) {
			column.increments();
			column.text('image_url');
			column
				.integer('log_id')
				.unsigned()
				.references('id')
				.inTable('sensor_logs')
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists('logs_images')
		.dropTableIfExists('sensors_and_operators')
		.dropTableIfExists('sensor_logs')
		.dropTableIfExists('operators')
		.alterTable('sensors', function(column) {
			column.dropUnique('physical_id');
		});
};
