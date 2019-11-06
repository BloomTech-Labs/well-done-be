exports.up = function(knex) {
  return knex.schema.createTable("pumps", column => {
    column.increments();
    column.integer("sensor_pid")
    column.string("country_name");
    column.string("province_name");
    column.string("district_name");
    column.string("commune_name");
    column
      .float("latitude")
      .notNullable();
    column
      .float("longitude")
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("pumps");
};