
SELECT name AS department, sum(salary) AS 'Total Utilized Budget'
FROM roles JOIN departments 
ON roles.department_id = departments.id GROUP BY name;
