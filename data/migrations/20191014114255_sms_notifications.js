exports.up = function(knex) {
  return knex.schema.createTable("sms_notifications", column => {
    column.increments();
    column.string("mobile_number");
    column
      .integer("pump_id")
      .unsigned()
      .references("id")
      .inTable("pumps")
      .onUpdate("RESTRICT")
      .onDelete("RESTRICT");
    column
      .integer("org_id")
      .unsigned()
      .references("org_id")
      .inTable("accounts")
      .onUpdate("RESTRICT")
      .onDelete("RESTRICT");
    column
      .integer("sensor_id")
      .unsigned()
      .references("id")
      .inTable("sensors")
      .onUpdate("RESTRICT")
      .onDelete("RESTRICT");
    column.integer("status");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sms_notifications");
};
