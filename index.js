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

const getRolesTitless = () => {
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
getRolesTitless();
getDepartmentNames()

const allQuestions = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'option',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Roll',
      'View All Departments',
      'Add Department',
      'Quit',
    ],
  },
];

const addEmpQuestions = [
  {
    type: 'input',
    message: "What is the employee's first name?",
    name: 'firstName',
  },
  {
    type: 'input',
    message: "What is the employee's last name?",
    name: 'lastName',
  },
  {
    type: 'list',
    message: "What is the employee's role?",
    name: 'role',
    choices: roles,
  },
  {
    type: 'list',
    message: "Who is the employee's manager?",
    name: 'manager',
    choices: employees,
  },
];

const updEmpRoleQuestions = [
  {
    type: 'list',
    message: "Which employee's role do you want to update?",
    name: 'name',
    choices: employees,
  },
  {
    type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'role',
    choices: roles,
  },
];

const addRoleQuestions = [
  {
    type: 'input',
    message: 'What is the name of the role?',
    name: 'role',
  },
  {
    type: 'input',
    message: 'What is the salary of the role?',
    name: 'salary',
  },
  {
    type: 'list',
    message: 'Which department does the role belong to?',
    name: 'name',
    choices: departments,
  },
];

const addDepQuestions = [
  {
    type: 'input',
    message: 'What is the name of the department',
    name: 'name',
  },
];

// Function to initialize app
const init = () => {
  inquirer
    .prompt(allQuestions)
    .then((data) => {
      if (data.option === 'Add Employee') {
        inquirer.prompt(addEmpQuestions).then((data) => {
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
        inquirer.prompt(updEmpRoleQuestions).then((data) => {
          updateEmployeeRole(db, init, data.name, data.role);
          console.log(`Updated ${data.name}' role`);
        });
      } else if (data.option === 'Add Roll') {
        inquirer.prompt(addRoleQuestions).then((data) => {
          addRole(db, init, data.role, data.salary, data.name);
          console.log(`Added ${data.role} to the database`);
        });
      } else if (data.option === 'Add Department') {
        inquirer.prompt(addDepQuestions).then((data) => {
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
