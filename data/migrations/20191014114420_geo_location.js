exports.up = function(knex) {
  return knex.schema.createTable("geo_location", column => {
    column.increments();
    column
      .float("latitude")
      .notNullable()
      .unique();
    column
      .float("longitude")
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("geo_location");
};
