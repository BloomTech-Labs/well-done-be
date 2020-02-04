exports.up = function(knex) {
  return knex.schema.createTable("sms_notifications", column => {
    column.increments();
    column.string("mobile_number");
    column
      .integer("org_id")
      .unsigned()
      .references("id")
      .inTable("organizations")
      .onUpdate("RESTRICT")
      .onDelete("RESTRICT");
    column.integer("status");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sms_notifications");
};
