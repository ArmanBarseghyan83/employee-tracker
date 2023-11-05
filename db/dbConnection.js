const mysql = require('mysql2');

// Connect to the database.
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: 'employee_db',
    },
    console.log(`Connected to the employee_db database.`)
  );

module.exports = db  