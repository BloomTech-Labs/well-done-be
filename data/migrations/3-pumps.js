exports.up = function(knex) {
  return knex.schema.createTable("pumps", column => {
    column.increments();
    column
      .integer("org_id")
      .unsigned()
      .references("id")
      .inTable("organizations")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");
    column.integer("sensor_ID")
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