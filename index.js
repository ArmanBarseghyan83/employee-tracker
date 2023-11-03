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
  updateEmployeeRole,
] = require('./db/query.js');

const [
  allQuestions,
  addEmpQuestions,
  updEmpRoleQuestions,
  addRoleQuestions,
  addDepQuestions
] = require('./lib/questions.js')

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'employee_db',
  },
  console.log(`Connected to the employee_db database.`)
);


let employees = [];
let roles = [];
let departments = [];

const getEmployeesNames = () => {
  db.promise()
    .query(`SELECT first_name, last_name FROM employees`)
    .then(([results]) => {
      results.forEach((result) => employees.push(`${result.first_name} ${result.last_name}`))
    })
    .catch(console.log);
};

const getRolesTitles = () => {
  db.promise()
    .query(`SELECT title FROM roles`)
    .then(([results]) => {
      results.forEach((result) => roles.push(result.title))
    })
    .catch(console.log);
};

const getDepartmentNames = () => {
  db.promise()
    .query(`SELECT name FROM departments`)
    .then(([results]) => {
      results.forEach((result) => departments.push(result.name))
    })
    .catch(console.log);
};

getEmployeesNames();
getRolesTitles();
getDepartmentNames()

// Function to initialize app
const init = () => {
  inquirer
    .prompt(allQuestions())
    .then((data) => {
      if (data.option === 'Add Employee') {
        inquirer.prompt(addEmpQuestions(roles, employees)).then((data) => {
          addEmployee(
            db,
            init,
            data.firstName,
            data.lastName,
            data.role,
            data.manager === 'None' ? '' : data.manager
          );
          console.log(
            `Added ${data.firstName} ${data.lastName} to the database`
          );
        });
      } else if (data.option === 'Update Employee Role') {
        inquirer.prompt(updEmpRoleQuestions(roles, employees)).then((data) => {
          updateEmployeeRole(db, init, data.name, data.role);
          console.log(`Updated ${data.name}' role`);
        });
      } else if (data.option === 'Add Roll') {
        inquirer.prompt(addRoleQuestions(departments)).then((data) => {
          addRole(db, init, data.role, data.salary, data.name);
          console.log(`Added ${data.role} to the database`);
        });
      } else if (data.option === 'Add Department') {
        inquirer.prompt(addDepQuestions()).then((data) => {
          addDepartment(db, init, data.name);
          console.log(`Added ${data.name} to the database`);
        });
      } else if (data.option === 'View All Employees') {
        allEmployees(db, init);
      } else if (data.option === 'View All Roles') {
        allRoles(db, init);
      } else if (data.option === 'View All Departments') {
        allDepartments(db, init);
      } else if (data.option === 'Quit') {
        process.exit();
      }
    })
    .catch(console.log);
};

// Function call to initialize app
init();
