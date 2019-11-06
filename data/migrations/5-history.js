exports.up = function(knex) {
  return knex.schema.createTable("history", column => {
    column.increments();
    column.date("date").nullable();
    column.integer("count").nullable();
    column.integer("total").nullable();
    column.integer("status").nullable();
    column.integer("sensor_id");
    column.float("reported_percent").nullable();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("history");
};