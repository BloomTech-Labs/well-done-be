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

  staging: {
    client: 'pg',
    connection: {
      host: "postgresql://lambda:password@aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com:5432/welldone",
      database: 'welldone-staging',
      user:     'lambda',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  },

  production: {
    client: 'pg',
    connection: {
      host: "postgresql://lambda:password@aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com:5432/welldone",
      database: 'welldone-production',
      user:     'lambda',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
  }

};
