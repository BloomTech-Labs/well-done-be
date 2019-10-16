
exports.up = function(knex) {
    return knex.schema.createTable("historical", column => {
        column.increments();
        column.date("date");
        column.integer("count");
        column.integer("total");
        column.integer("status");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("historical");

};
