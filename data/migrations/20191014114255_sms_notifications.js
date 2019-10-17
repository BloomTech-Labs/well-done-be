exports.up = function(knex) {
  return knex.schema.createTable("sms_notifications", column => {
    column.increments();
    column.string("mobile_number");
    column
      .integer("pump_id")
      .unsigned()
      .references("id")
      .inTable("pumps")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column
      .integer("org_id")
      .unsigned()
      .references("org_id")
      .inTable("accounts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column
      .integer("sensor_id")
      .unsigned()
      .references("id")
      .inTable("sensors")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column.integer("status");
    column
      .integer("account_id")
      .unsigned()
      .references("id")
      .inTable("accounts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sms_notifications");
};
