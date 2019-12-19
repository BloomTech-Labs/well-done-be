exports.up = function(knex) {
	return knex.schema.createTable('tickets', column => {
		column.increments();
		column.text('notes');
		column.string('damage');
		column.boolean('ticket_status');
		column.boolean('needs_parts');
		column.timestamp('created_at').defaultTo(knex.fn.now());
		column
			.integer('sensor_id')
			.unsigned()
			.references('id')
			.inTable('sensors')
			.onDelete('RESTRICT')
			.onUpdate('RESTRICT');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('tickets');
};
