require('dotenv').config();
require('console.table');
const db = require('./db/dbConnection.js')
const inquirer = require('inquirer');

const [
  getEmployeesNames,
  getRolesTitles,
  getDepartmentNames,
] = require('./db/namesQuery.js');

const [
  allDepartments,
  allRoles,
  allEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
] = require('./db/questionsQuery.js');

const [
  allQuestions,
  addEmpQuestions,
  updEmpRoleQuestions,
  addRoleQuestions,
  addDepQuestions,
] = require('./lib/questions.js');


let employees = [];
let roles = [];
let departments = [];


getEmployeesNames(db, employees);
getRolesTitles(db, roles);
getDepartmentNames(db, departments);

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
