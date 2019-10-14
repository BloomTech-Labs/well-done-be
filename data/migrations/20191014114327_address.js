exports.up = function(knex) {
  return knex.schema.createTable("address", column => {
    column.increments();
    // foreign key to country_id
    column
      .integer("country_id")
      .unsigned()
      .references("id")
      .inTable("countries")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    // foreign key to province_id
    column
      .integer("province_id")
      .unsigned()
      .references("id")
      .inTable("province")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    // foreign key to district_id
    column
      .integer("district_id")
      .unsigned()
      .references("id")
      .inTable("district")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    // foreign key to commune_id
    column
      .integer("commune_id")
      .unsigned()
      .references("id")
      .inTable("commune")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    // foreign key to geo_location_id
    column
      .integer("geo_location_id")
      .unsigned()
      .references("id")
      .inTable("geo_location")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("address");
};
