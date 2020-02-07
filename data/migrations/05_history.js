exports.up = function(knex) {
	return knex.schema.createTable('history', column => {
		column.increments();
		column.timestamp('created_at').defaultTo(knex.fn.now());
		column.string('date').nullable();
		column.integer('count').nullable();
		column.bigInteger('total').nullable();
		column.integer('status').nullable();
		column.integer('sensor_id');
		column.float('reported_percent').nullable();
		column.integer('pad_count_0');
		column.integer('pad_count_1');
		column.integer('pad_count_2');
		column.integer('pad_count_3');
		column.integer('pad_seconds_0');
		column.integer('pad_seconds_1');
		column.integer('pad_seconds_2');
		column.integer('pad_seconds_3');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('history');
};
