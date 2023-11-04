const getEmployeesNames = (db, employees) => {
  db.promise()
    .query(`SELECT first_name, last_name FROM employees`)
    .then(([results]) => {
      results.forEach((result) =>
        employees.push(`${result.first_name} ${result.last_name}`)
      );
    })
    .catch(console.log);
};

const getRolesTitles = (db, roles) => {
  db.promise()
    .query(`SELECT title FROM roles`)
    .then(([results]) => {
      results.forEach((result) => roles.push(result.title));
    })
    .catch(console.log);
};

const getDepartmentsNames = (db, departments) => {
  db.promise()
    .query(`SELECT name FROM departments`)
    .then(([results]) => {
      results.forEach((result) => departments.push(result.name));
    })
    .catch(console.log);
};

module.exports = [getEmployeesNames, getRolesTitles, getDepartmentsNames];
