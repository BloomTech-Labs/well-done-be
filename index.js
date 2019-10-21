require('dotenv').config();
const server = require('./api/server.js');
const defaults = require('./config/defaults')

const express = require('express')

// const { Pool, Client } = require('pg')
// const connectionString = process.env.DATABASE_URL
// const pool = new Pool({
//   connectionString: connectionString,
//   ssl: true
// })
// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })
// const client = new Client({
//   connectionString: connectionString,
//   ssl: true
// })
// client.connect()
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })
// server.get('/', (request, response) => {
//   response.json({ info: 'Node.js, Express, and Postgres API' })
// })
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();
// app.listen(port, () => {
//   console.log(`App running on port ${port}.`)
// })

server.listen(defaults.port, () => {
  console.log(`\n*** Server Running on http://localhost:${defaults.port} ***\n`);
})