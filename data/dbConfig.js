const knex = require("knex");
require("dotenv").config();

const environment = process.env.NODE_ENV || "production";

const config = require("../knexfile.js")[environment];

module.exports = knex(config);