
exports.up = function(knex) {
    return knex.schema.createTable("pad_counts", column => {
        column.increments();
        column.integer("pad_count_0");
        column.integer("pad_count_1");
        column.integer("pad_count_2");
        column.integer("pad_count_3");
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
