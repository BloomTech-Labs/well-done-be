const express = require('express');
const helmet = require('helmet');
const cors = require('cors')

const server = express();

// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());

//routes
const authRouter = require("./auth/auth.js");


server.use("/auth", authRouter);


server.get('/', (req, res) => {
    res.send(`
    <h2>Welcome to the Jungle 🌴</h2>
    `)
});

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);

module.exports = server;