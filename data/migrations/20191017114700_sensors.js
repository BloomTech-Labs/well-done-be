exports.up = function(knex) {
  return knex.schema.createTable("sensors", column => {
    column.increments();
    column
      .integer("pump_id")
      .unsigned()
      .references("id")
      .inTable("pumps")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    column.integer("physical_id");
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
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sensors");
};
