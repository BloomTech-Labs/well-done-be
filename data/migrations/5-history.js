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
    
    column.integer("pad_seconds");
    column.integer("pad_counts");
    column.integer("reported_percent");

  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("history");
};