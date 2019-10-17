require('dotenv').config();
const server = require('./api/server.js');
const defaults = require('./config/defaults')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

server.use(bodyParser.json())
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
server.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// app.listen(port, () => {
//   console.log(`App running on port ${port}.`)
// })

server.listen(defaults.port, () => {
  console.log(`\n*** Server Running on http://localhost:${defaults.port} ***\n`);
})