const knex = require("knex");
require("dotenv").config();

const knexfile = require('../knexfile');


const env = process.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

module.exports = knex(configOptions);
 
module.exports = database;
module.exports = knex(config);