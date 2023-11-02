require('dotenv').config();
require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const [
  allDepartments,
  allRoles,
  allEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
] = require('./db/query.js');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db',
  },
  console.log(`Connected to the employee_db database.`)
);

const questions = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'options',
    choices: [
      'View All Employees',
      'Add Employee',
      'Updata Employee Role',
      'View All Roles',
      'Add Roll',
      'View All Departments',
      'Add Department',
    ],
  },
];

// Function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then((data) => {

    })
    .catch(console.log);
}

// Function call to initialize app
init();
