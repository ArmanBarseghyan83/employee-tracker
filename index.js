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

const allQuestions = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'option',
    choices: [
      'View All Employees',
      'Add Employee',
      'Updata Employee Role',
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
    choices: [
      'Sales Lead',
      'Salesperson',
      'Lead Engineer',
      'Software Engineer',
      'Account Manager',
      'Accountant',
      'Legal Team Lead',
      'Lawyer',
    ],
  },
  {
    type: 'list',
    message: "Who is the employee's manager?",
    name: 'manager',
    choices: [
      'None',
      'John Doe',
      'Mike Chan',
      'Ashley Rodriguez',
      'Kevin Tupik',
      'Kunal Singh',
      'Malia Broun',
      'Sarah Lourd',
      'Tom Allen',
      'Sam Kash',
    ],
  },
];

const updEmpRoleQuestions = [
  {
    type: 'list',
    message: "Which employee's role do you want to update?",
    name: 'name',
    choices: [
      'none',
      'John Doe',
      'Mike Chan',
      'Ashley Rodriguez',
      'Kevin Tupik',
      'Kunal Singh',
      'Malia Broun',
      'Sarah Lourd',
      'Tom Allen',
      'Sam Kash',
    ],
  },
  {
    type: 'list',
    message: 'Which role do you want to assign the selected employee?',
    name: 'role',
    choices: [
      'Sales Lead',
      'Salesperson',
      'Lead Engineer',
      'Software Engineer',
      'Account Manager',
      'Accountant',
      'Legal Team Lead',
      'Lawyer',
    ],
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
    choices: ['Engineering', 'Finance', 'Legal', 'Sales'],
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
function init() {
  inquirer
    .prompt(allQuestions)
    .then((data) => {
      if (data.option === 'Add Employee') {
        inquirer.prompt(addEmpQuestions).then((data) => {
          addEmployee(
            db,
            data.firstName,
            data.lastName,
            data.role,
            data.manager === 'None' ? '' : data.manager
          );
          init();
        });
      } else if (data.option === 'Updata Employee Role') {
        inquirer.prompt(updEmpRoleQuestions).then((data) => {
          init();
        });
      } else if (data.option === 'Add Roll') {
        inquirer.prompt(addRoleQuestions).then((data) => {
          init();
        });
      } else if (data.option === 'Add Department') {
        inquirer.prompt(addDepQuestions).then((data) => {
          init();
        });
      } else {
        init();
      }
    })
    .catch(console.log);
}

// Function call to initialize app
init();
