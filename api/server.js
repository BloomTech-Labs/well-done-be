const express = require('express');
const helmet = require('helmet');
const cors = require('cors')

const server = express();


//----------*

// const Sequelize = require('sequelize');
// // const sequelize = new Sequelize('welldone', 'postgres', 'shahid', {
// //   host: 'aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com',
// //   dialect: 'postgres',
// //   pool: {
// //     max: 9,
// //     min: 0,
// //     idle: 10000
// //   }
// // });
// var sequelize = new Sequelize('postgresql://lambda:password@aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com:5432/welldone');

// sequelize.authenticate().then(() => {
//   console.log("Success!");
// }).catch((err) => {
//   console.log(err);
// });


//routes
const authRouter = require("./auth/auth.router");
const orgRouter = require("./organizations/organizations.router");
const pumpsRouter = require("./pumps/pumps.router");
const accountsRouter = require("./accounts/accounts.router");
const smsNotificationsRouter = require("./sms_notifications/sms_notifications.router");
const sensorsRouter = require("./sensors/sensors.router");
const historyRouter = require("./history/history.router");

// middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/auth", authRouter);
server.use("/api/orgs", orgRouter);
server.use("/api/pumps", pumpsRouter);
server.use("/api/sensors", sensorsRouter)
server.use("/api/accounts", accountsRouter);
server.use("/api/sms_notifications", smsNotificationsRouter);
// TODO: server.use("/api/sensors", sensorsRouter);
server.use("/api/history", historyRouter);

//routes
// const authRouter = require("./auth/auth.js");


// server.use("/auth", authRouter);


server.get('/', (req, res) => {
    res.send(`
    <h2>Welcome to the Jungle 🌴</h2>
    `)
});

module.exports = server;