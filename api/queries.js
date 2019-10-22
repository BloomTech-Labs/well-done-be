const Pool = require('pg').Pool
const pool = new Pool({
    host: "aa10su4jt2enzmn.cudv4hjvenyx.us-east-2.rds.amazonaws.com",
    user: "lambda",
    password: "password",
    database: "welldone",
    port: 5432,
})