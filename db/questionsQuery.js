// View all departments.
const allDepartments = (db, init) => {
  db.promise()
    .query(`SELECT * FROM departments`)
    .then(([results]) => {
      console.table(' ', results)
      init()
    })
    .catch(console.log);
};

// View all roles.
const allRoles = (db, init) => {
  db.promise()
    .query(
      `SELECT roles.id, title, name AS department, salary
  FROM roles 
  JOIN departments ON roles.department_id = departments.id
  ORDER BY roles.id`
    )
    .then(([results]) => {
      console.table(' ', results);
      init()
    })
    .catch(console.log);
};

// View all employees, their roles, salaries, departments, and managers.
const allEmployees = (db, init) => {
  db.promise()
    .query(
      `SELECT e.id, e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM roles
  JOIN employees e ON e.role_id = roles.id
  LEFT JOIN employees m ON e.manager_id = m.id
  JOIN departments ON roles.department_id = departments.id
  ORDER BY e.id`
    )
    .then(([results]) => {
      console.table(' ', results);
      init()
    })
    .catch(console.log);
};

// View total utilized budget of all departments.
const depUtilizedBudget = (db, init) => {
  db.promise()
    .query(
      `SELECT name AS department, sum(salary) AS 'Total Utilized Budget'
      FROM roles JOIN departments 
      ON roles.department_id = departments.id GROUP BY name;`
    )
    .then(([results]) => {
      console.table(' ', results);
      init()
    })
    .catch(console.log);
};

// Add new department to the db.
const addDepartment = (db, init, depName) => {
  db.promise()
    .query(`INSERT INTO departments (name) VALUES ( ? )`, depName)
    .then(() => init())
    .catch(console.log);
};

// Add new role to the db.
const addRole = (db, init, title, salary, department) => {
  db.promise()
    .query(`SELECT id FROM departments WHERE name = ?`, department)
    .then(([results]) => {
      const departmentId = results[0].id;
      db.promise().query(
        `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
        [title, salary, departmentId]
      );
      init()
    })
    .catch(console.log);
};

// Add new employee to the db.
const addEmployee = (db, init, first_name, last_name, role, manager = '') => {
  let roleId;
  let managerId;
  db.promise()
    .query(`SELECT id FROM roles WHERE title = ?`, role)
    .then(([results]) => {
      roleId = results[0].id;

      return manager
        ? db
            .promise()
            .query(
              `SELECT id FROM employees WHERE CONCAT(first_name, ' ', last_name) = ?`,
              manager
            )
        : [];
    })
    .then(([results]) => {
      managerId = manager ? results[0].id : null;
      db.promise().query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`,
        [first_name, last_name, roleId, managerId]
      );
      init()
    })
    .catch(console.log);
};

// Update employee’s role
const updateEmployeeRole = (db, init, employee, role) => {
  db.promise()
    .query(`SELECT id FROM roles WHERE title = ?`, role)
    .then(([results]) => {
      const roleId = results[0].id;
      db.promise().query(
        `UPDATE employees SET role_id = ? WHERE CONCAT(first_name, ' ', last_name) = ?`,
        [roleId, employee]
      );
      init()
    })
    .catch(console.log);
};

module.exports = [
  allDepartments,
  allRoles,
  allEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  depUtilizedBudget
];
