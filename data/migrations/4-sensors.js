exports.up = function(knex) {
  return knex.schema.createTable("sensors", column => {
    column.increments();
    column.integer("physical_id");
    column.string("kind");
    column.string("type");
    column.integer("cellular");
    column.integer("bluetooth");
    column.string("training");
    column.string("remark");
    column.string("data_finished");
    column.integer("depth")
    column.float("yield");
    column.float("static");
    column.string("quality");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sensors");
};
