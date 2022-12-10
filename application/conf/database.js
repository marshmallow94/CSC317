const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '014671Pinoe.chu',
    database: 'csc317db',
    queueLimit: 0,
    waitForConnections: true,
    connectionLimit: 20
  });

const promisePool = pool.promise();
module.exports = promisePool;
