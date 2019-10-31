
exports.up = function(knex) {
    return knex.schema.createTable("pad_counts", column => {
        column.increments();
        column.integer("count_0");
        column.integer("count_1");
        column.integer("count_2");
        column.integer("count_3");
        column
          .integer("history_id")
          .unsigned()
          .references("id")
          .inTable("history")
          .onUpdate("RESTRICT")
          .onDelete("RESTRICT");
    
      });
    };
  

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("pad_counts");

};
