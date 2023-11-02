require('dotenv').config()
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db',
  },
  console.log(`Connected to the employee_db database.`)
);

db.query(`SELECT * FROM departments`, function (err, results) {
  console.table(results);
});

db.query(
  `SELECT roles.id, title, name AS department, salary
   FROM roles 
   JOIN departments ON roles.department_id = departments.id
   ORDER BY roles.id`,
  function (err, results) {
    console.table(results);
  }
);

db.query(
  `SELECT e.id, e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
   FROM roles
   JOIN employees e ON e.role_id = roles.id
   LEFT JOIN employees m ON e.manager_id = m.id
   JOIN departments ON roles.department_id = departments.id
   ORDER BY e.id`,
  function (err, results) {
    console.table(results);
  }
);
