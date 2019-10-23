const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

//routes
const authRouter = require("./auth/auth.router");
const orgRouter = require("./organizations/organizations.router");
const pumpsRouter = require("./pumps/pumps.router");
const accountsRouter = require("./accounts/accounts.router");
const smsNotificationsRouter = require("./sms_notifications/sms_notifications.router");
const sensorsRouter = require("./sensors/sensors.router");
const historyRouter = require("./history/history.router");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/auth", authRouter);
server.use("/api/orgs", orgRouter);
server.use("/api/pumps", pumpsRouter);
server.use("/api/sensors", sensorsRouter);
server.use("/api/accounts", accountsRouter);
server.use("/api/sms_notifications", smsNotificationsRouter);
server.use("/api/history", historyRouter);

const { Pool, Client } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl: true
});
pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});
const client = new Client({
  connectionString: connectionString,
  ssl: true
});
client.connect();
client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});

server.get("/", (req, res) => {
  res.status(200).json(`Welcome to the Jungle`);
});

module.exports = server;
