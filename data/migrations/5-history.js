exports.up = function(knex) {
  return knex.schema.createTable("history", column => {
    column.increments();
    column.date("date").nullable();
    column.integer("count").nullable();
    column.integer("total").nullable();
    column.integer("status").nullable();
    column.integer("sensor_id");
    column.specificType("pad_seconds","integer ARRAY").nullable();
    column.specificType("pad_counts", "integer ARRAY").nullable();
    column.integer("reported_percent").nullable();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("history");
};