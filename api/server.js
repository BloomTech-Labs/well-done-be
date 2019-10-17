const express = require('express');
const helmet = require('helmet');
const cors = require('cors')

const server = express();

const { Client } = require('pg')
const client = new Client({
  host: "aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com",
  user: "lambda",
  password: "password",
  database: "welldone"
})
client.connect()

// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

//routes
// const authRouter = require("./auth/auth.js");


// server.use("/auth", authRouter);


server.get('/', (req, res) => {
    res.send(`
    <h2>Welcome to the Jungle 🌴</h2>
    `)
});

module.exports = server;