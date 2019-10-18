const knex = require("knex");
require("dotenv").config();

const environment = process.env.NODE_ENV || "development";

const config = require("../knexfile.js")[environment];
const database = knex({
    client: "pg", // pg is the database library for postgreSQL on knexjs
    connection: {
      host: 'aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com', // Your local host IP
      user: "lambda", // Your postgres user name
      password: "password", // Your postgres user password
      database: "welldone" // Your database name
    }
  });
 
module.exports = database;
module.exports = knex(config);