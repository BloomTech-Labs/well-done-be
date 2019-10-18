exports.up = function(knex) {
  return knex.schema.createTable("history", column => {
    column.increments();
    column.date("date");
    column.integer("count");
    column.integer("total");
    column.integer("status");
    column
      .integer("sensor_id")
      .unsigned()
      .references("id")
      .inTable("sensors")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("history");
};
