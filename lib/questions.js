const [ numberValidate, emptyValidate ] = require('./inputValidate.js')

const allQuestions = () => {
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

const addEmpQuestions = (roles, employees) => {
  return [
    {
      type: 'input',
      message: "What is the employee's first name?",
      name: 'firstName',
      validate: emptyValidate
    },
    {
      type: 'input',
      message: "What is the employee's last name?",
      name: 'lastName',
      validate: emptyValidate
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
};

const updEmpRoleQuestions = (roles, employees) => {
  return [
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
};

const addRoleQuestions = (departments) => {
  return [
    {
      type: 'input',
      message: 'What is the name of the role?',
      name: 'role',
      validate: emptyValidate
    },
    {
      type: 'input',
      message: 'What is the salary of the role?',
      name: 'salary',
      validate: numberValidate
    },
    {
      type: 'list',
      message: 'Which department does the role belong to?',
      name: 'name',
      choices: departments,
    },
  ];
};

const addDepQuestions = () => {
  return [
    {
      type: 'input',
      message: 'What is the name of the department',
      name: 'name',
      validate: emptyValidate
    },
  ];
};

module.exports = [
    allQuestions,
    addEmpQuestions,
    updEmpRoleQuestions,
    addRoleQuestions,
    addDepQuestions
]