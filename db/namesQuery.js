// Push first and last names from the db to the employees array.
const updateEmployeeNames = (db, employees) => {
  db.promise()
    .query(`SELECT first_name, last_name FROM employees`)
    .then(([results]) => {
      results.forEach((result) =>
        employees.push(`${result.first_name} ${result.last_name}`)
      );
    })
    .catch(console.log);
};

// Push roles titles from the db to the roles array.
const updateRoleTitles = (db, roles) => {
  db.promise()
    .query(`SELECT title FROM roles`)
    .then(([results]) => {
      results.forEach((result) => roles.push(result.title));
    })
    .catch(console.log);
};

// Push departments names from the db to the departments array.
const updateDepartmentNames = (db, departments) => {
  db.promise()
    .query(`SELECT name FROM departments`)
    .then(([results]) => {
      results.forEach((result) => departments.push(result.name));
    })
    .catch(console.log);
};

module.exports = [updateEmployeeNames, updateRoleTitles, updateDepartmentNames];
