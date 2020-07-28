require('dotenv').config();
const db = require('./data/dbConfig.js');
const server = require('./api/server.js');
const defaults = require('./config/defaults')

db.migrate.latest()

server.listen(defaults.port, () => {
  console.log(`\n*** Server Running on http://localhost:${defaults.port} ***\n`);
})