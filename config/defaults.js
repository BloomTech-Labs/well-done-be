module.exports = {
    port: process.env.PORT || 4000,
    ssl: true
  };

// const { Pool } = require('pg')
// const isProduction = process.env.NODE_ENV === 'development'

// const connectionString = process.env.DATABASE_URL 

// //`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: true,
// })

// module.exports = { pool }

// const { Pool, Client } = require('pg')
// const connectionString = process.env.DATABASE_URL
// const pool = new Pool({
//   connectionString: connectionString,
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// const client = new Client({
//   connectionString: connectionString,
// })
// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

// module.exports = { pool }
// module.exports = { client }