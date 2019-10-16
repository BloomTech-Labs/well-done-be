const express = require('express');
const helmet = require('helmet');
const cors = require('cors')

const server = express();

// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());


server.get('/', (req, res) => {
    res.send(`
    <h2>Welcome to the Jungle 🌴</h2>
    `)
});



module.exports = server;

