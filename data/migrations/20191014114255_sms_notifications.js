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
      .integer("organization_id")
      .unsigned()
      .references("id")
      .inTable("organization")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column
      .integer("sensor_id")
      .unsigned()
      .references("id")
      .inTable("sensor")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column.integer("status");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sms_notifications");
};
