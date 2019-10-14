exports.up = function(knex) {
  return knex.schema.createTable("accounts", column => {
    column.increments();
    column
      .integer("account_types_id")
      .unsigned()
      .references("id")
      .inTable("account_types")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column
      .integer("organization_id")
      .unsigned()
      .references("id")
      .inTable("organization")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column.string("first_name").notNullable();
    column.string("last_name").notNullable();
    column
      .string("email_address")
      .notNullable()
      .unique();
    column.string("password").notNullable();
    column.string("mobile_number").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("accounts");
};
