module.exports = {
  "development": {
    "username": "lambda",
    "password": "password",
    "database": "welldone-development",
    "host": "aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "test": {
    "username": "lambda",
    "password": "password",
    "database": "welldone-test",
    "host": "aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com",
    "dialect": "postgres",
    "operatorsAliases": false
  },
  "production": {
    "username": "lambda",
    "password": "password",
    "database": "welldone-production",
    "host": "aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com",
    "dialect": "postgres",
    "operatorsAliases": false
  }
}

// require('dotenv').config()

// module.exports = {
//   development: {
//     url: process.env.DEV_DATABASE_URL,
//     dialect: 'postgres',
//   },
//   test: {
//     url: process.env.TEST_DATABASE_URL,
//     dialect: 'postgres',
//   },
//   production: {
//     url: process.env.DATABASE_URL,
//     dialect: 'postgres',
//   },
// }