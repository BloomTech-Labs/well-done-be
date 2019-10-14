exports.up = function(knex) {
  return knex.schema.createTable("organization", column => {
    column.increments();
    column
      .integer("accounts_id")
      .unsigned()
      .references("id")
      .inTable("accounts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column.string("organization_name");
    column.string("headquarter_city");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("organization");
};
