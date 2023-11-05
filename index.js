require('dotenv').config();
require('console.table');
const db = require('./db/dbConnection.js');
const inquirer = require('inquirer');

const [
  allDepartments,
  allRoles,
  allEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  depUtilizedBudget,
] = require('./db/questionsQuery.js');

const [
  allQuestions,
  addEmpQuestions,
  updEmpRoleQuestions,
  addRoleQuestions,
  addDepQuestions,
  updateChoices
] = require('./lib/questions.js');

// Function to initialize app
const init = () => {
  updateChoices()
  inquirer
    .prompt(allQuestions())
    .then((data) => {
      if (data.option === 'Add Employee') {
        inquirer.prompt(addEmpQuestions()).then((data) => {
          addEmployee(
            db,
            init,
            data.firstName,
            data.lastName,
            data.role,
            data.manager === 'None' ? '' : data.manager
          )
          console.log(
            `Added ${data.firstName} ${data.lastName} to the database`
          );
        });
      } else if (data.option === 'Update Employee Role') {
        inquirer.prompt(updEmpRoleQuestions()).then((data) => {
          updateEmployeeRole(db, init, data.name, data.role);
          console.log(`Updated ${data.name}' role`);
        });
      } else if (data.option === 'Add Roll') {
        inquirer.prompt(addRoleQuestions()).then((data) => {
          addRole(db, init, data.role, data.salary, data.name);
          console.log(`Added ${data.role} to the database`);
        });
      } else if (data.option === 'Add Department') {
        inquirer.prompt(addDepQuestions()).then((data) => {
          addDepartment(db, init, data.name);
          console.log(`Added ${data.name} to the database`);
        });
      } else if (data.option === 'View All Employees') {
        allEmployees(db, init)
      } else if (data.option === 'View All Roles') {
        allRoles(db, init);
      } else if (data.option === 'View All Departments') {
        allDepartments(db, init);
      } else if (data.option === 'View Total Utilized Budget By Department') {
        depUtilizedBudget(db, init);
      } else if (data.option === 'Quit') {
        process.exit();
      }
    })
    .catch(console.log);
};

// Function call to initialize app
init();
