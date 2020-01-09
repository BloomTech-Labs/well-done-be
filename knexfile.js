// Update with your config settings.
require("dotenv").config();
// dotenv.config({ path: "./env" });

module.exports = {
  development: {
    client: "pg",
    useNullAsDefault: true,
    connection: process.env.DB_LOCAL_URL || {
      database: process.env.DB_LOCAL,

      user: process.env.DB_LOCAL_USER,

      password: process.env.DB_LOCAL_PASSWORD
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./data/route.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: { directory: "./data/seeds" }
  },
  ssl: true
};
