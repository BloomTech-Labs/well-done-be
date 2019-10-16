exports.up = function(knex) {
  return knex.schema.createTable("pumps", column => {
    column.increments();

    column
      .integer("organization_id")
      .unsigned()
      .references("id")
      .inTable("organization")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column.string("country_name");
    column.string("province_name");
    column.string("commune_name");
    column.string("district_name");
    column.integer("latitude");
    column.integer("longitude");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("pumps");
};

