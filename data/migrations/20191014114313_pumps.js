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
    column
      .integer("address_id")
      .unsigned()
      .references("id")
      .inTable("address")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column.integer("status");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("pumps");
};
