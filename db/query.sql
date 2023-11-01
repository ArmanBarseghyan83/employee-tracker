
/* SELECT e.id, e.first_name, e.last_name, title, name AS department, salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM roles
JOIN employees e ON e.role_id = roles.id
LEFT JOIN employees m ON e.manager_id = m.id
JOIN departments ON roles.department_id = departments.id
ORDER BY e.id;

SELECT * FROM departments;

SELECT roles.id, title, name AS department, salary
FROM roles 
JOIN departments ON roles.department_id = departments.id
ORDER BY roles.id ; */