// Update with your config settings.
// require('dotenv').config();
// dotenv.config({ path: "./env" });

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/auth.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
  },
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
      directory: __dirname + "/data/migrations"
    },
    seeds: { directory: __dirname + "/data/seeds" }
  },
  ssl: true
};
