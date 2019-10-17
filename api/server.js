const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

//haahhahahh

//routes
const authRouter = require("../api/auth/auth.router");
const orgRouter = require("./organizations/organizations.router");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/accounts", authRouter);
server.use("/api/orgs", orgRouter);

// middleware

server.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to the Jungle 🌴</h2>
    `);
});

module.exports = server;
