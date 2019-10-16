const knex = require("knex");
const config = require("../../knexfile");
// const db = knex(config.development);

const db = require("../data/dbConfig.js");


function getPumps() {
    return db('sensors')
}