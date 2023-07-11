const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "objetivo",
    port: "3306"
});

exports.pool = pool;