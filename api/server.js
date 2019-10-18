const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();


//routes
const authRouter = require("../api/auth/auth.router");
const orgRouter = require("./organizations/organizations.router");
const pumpsRouter = require("../api/pumps/pumps.router")
const sensorsRouter = require("../api/sensors/sensor.router")

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/accounts", authRouter);
server.use("/api/pumps", pumpsRouter);
server.use("/api/sensors", sensorsRouter)
server.use("/api/orgs", orgRouter);



// middleware

server.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to the Jungle 🌴</h2>
    `);
});

module.exports = server;
