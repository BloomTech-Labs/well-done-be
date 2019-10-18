// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/auth.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      }
  }
},

    testing: {
      client: 'pg',
      connection: process.env.POSTGRESQL_URL,
      migrations: {
        directory: './data/migrations',
      },
      seeds: { directory: './data/seeds' },
    },

    production: {
      client: 'pg',
      connection: process.env.POSTGRESQL_URL,
      migrations: {
        directory: './data/migrations',
      },
      seeds: { directory: './data/seeds' },
    },
    };
