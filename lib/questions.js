const [numberValidate, emptyValidate] = require('./inputValidate.js');
const [
  updateEmployeeNames,
  updateRoleTitles,
  updateDepartmentNames,
] = require('../db/namesQuery.js');

const db = require('../db/dbConnection.js');

// Inquirer list choices arrays
let employeeNames = [];
let roleTitles = [];
let departmentNames = [];

// Starting questions.
const allQuestions = () => {
  // Update inquirer list choices arrays based on db.
  updateEmployeeNames(db, employeeNames);
  updateRoleTitles(db, roleTitles);
  updateDepartmentNames(db, departmentNames);
  return [
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
        'View Total Utilized Budget By Department',
        'Add Department',
        'Quit',
      ],
    },
  ];
};

// Questions for adding a new employee.
const addEmpQuestions = () => {
  updateRoleTitles(db, roleTitles);
  updateDepartmentNames(db, departmentNames);
  return [
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'firstName',
      validate: emptyValidate,
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: 'lastName',
      validate: emptyValidate,
    },
    {
      type: 'list',
      message: "What is the employee's role?",
      name: 'role',
      choices: roleTitles,
    },
    {
      type: 'list',
      message: "Who is the employee's manager?",
      name: 'manager',
      choices: ['None', ...employeeNames],
    },
  ];
};


// Questions for updateing employee's role
const updEmpRoleQuestions = () => {
  updateEmployeeNames(db, employeeNames);
  updateRoleTitles(db, roleTitles);
  return [
    {
      type: 'list',
      message: "Which employee's role do you want to update?",
      name: 'name',
      choices: employeeNames,
    },
    {
      type: 'list',
      message: 'Which role do you want to assign the selected employee?',
      name: 'role',
      choices: roleTitles,
    },
  ];
};

// Questions for adding new a role.
const addRoleQuestions = () => {
  updateDepartmentNames(db, departmentNames);
  return [
    {
      type: 'input',
      message: 'What is the name of the role?',
      name: 'role',
      validate: emptyValidate,
    },
    {
      type: 'input',
      message: 'What is the salary of the role?',
      name: 'salary',
      validate: numberValidate,
    },
    {
      type: 'list',
      message: 'Which department does the role belong to?',
      name: 'name',
      choices: departmentNames,
    },
  ];
};

// Questions for adding new a department.
const addDepQuestions = () => {
  return [
    {
      type: 'input',
      message: 'What is the name of the department',
      name: 'name',
      validate: emptyValidate,
    },
  ];
};

module.exports = [
  allQuestions,
  addEmpQuestions,
  updEmpRoleQuestions,
  addRoleQuestions,
  addDepQuestions,
];
