const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const secrets = require("../config/secrets.js");
const { getUpdatedPumps, getUpdatedSensors, getUpdatedHistory  } = require('../services/mapData.js');

console.log("environment:", secrets.environment);
const server = express();

//routes
const authRouter = require("./auth/auth.router");
const orgRouter = require("./organizations/organizations.router");
const pumpsRouter = require("./pumps/pumps.router");
const accountsRouter = require("./accounts/accounts.router");
const smsNotificationsRouter = require("./sms_notifications/sms_notifications.router");
const sensorsRouter = require("./sensors/sensors.router");
const historyRouter = require("./history/history.router");
const mapPumpsRouter = require("../services/mapData");
const padSecondsRouter = require("./pad_seconds/pad_seconds.router")     
const padCountsRouter = require("./pad_counts/pad_counts.router")     


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
server.use("/api/mapData", mapPumpsRouter); 
server.use("/api/pad_counts", padCountsRouter);
server.use("/api/pad_seconds", padSecondsRouter)



server.get("/", (req, res) => {
  res.status(200).json(`Welcome to the Jungle`);

  // const getPumps = Pumps.map(pump => console.log(pump))
  // getPumps()
  // seedJSONPumps()
  // (seedJSONPumps()) ? seedJSONPumps : null; 
});


module.exports = server;
