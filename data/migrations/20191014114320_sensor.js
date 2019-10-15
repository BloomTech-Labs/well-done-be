exports.up = function(knex) {
  return knex.schema.createTable("sensor", column => {
    column.increments();
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
      .integer("historical_id")
      .unsigned()
      .references("id")
      .inTable("historical")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    column.integer("sensor_ID");
    column.string("kind");
    column.string("type");
    column.integer("cellular");
    column.integer("bluetooth");
    column.string("training");
    column.string("remark");
    column.date("data_finished");
    column.integer("depth");
    column.integer("yield");
    column.integer("static");
    column.string("quality");
    column.integer("level_dynamic");


    column
      .integer("date_id")
      .unsigned()
      .references("id")
      .inTable("dates")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sensor");
};
