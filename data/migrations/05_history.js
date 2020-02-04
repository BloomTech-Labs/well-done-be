exports.up = function(knex) {
  return knex.schema.createTable("history", column => {
    column.increments();
    column.timestamp("created_at").defaultTo(knex.fn.now())
    column.string("date").nullable();
    column.integer("count").nullable();
    column.bigInteger("total").nullable();
    column.integer("status").nullable();
    column.integer("sensor_id");
    column.float("reported_percent").nullable();

  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("history");
};