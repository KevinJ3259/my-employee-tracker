const db = require("./db/connection");

const inquirer = require("inquirer");
const consoleTable = require("console.table");

start();

async function start() {
  while (true) {
    await options();
  }
}

// prompts user with list of options to choose from
async function options() {
  const answer = await inquirer.prompt({
    name: "action",
    type: "list",
    message: "Welcome to our employee database! What would you like to do?",
    choices: [
      "View all employees",
      "View all departments",
      "View all roles",
      "Add an employee",
      "Add a department",
      "Add a role",
      "Update employee role",
      "Delete an employee",
      "EXIT",
    ],
  });
  // .then(function (answer) {
  switch (answer.action) {
    case "View all employees":
      viewEmployees();
      break;
    case "View all departments":
      viewDepartments();
      break;
    case "View all roles":
      viewRoles();
      break;
    case "Add an employee":
      await addEmployee();
      break;
    case "Add a department":
      await addDepartment();
      break;
    case "Add a role":
      await addRole();
      break;
    case "Update employee role":
      await updateRole();
      break;
    case "Delete an employee":
      await deleteEmployee();
      break;
    case "EXIT":
      await exitApp();
      break;
    default:
      break;
  }
  // });
}

function viewEmployees() {
  db.query(
    `
        SELECT
          E.id AS id,
          E.first_name AS "first name",
          E.last_name AS "last name",
          role.title AS "job title",
          department.name AS department,
          role.salary AS salary,
          CONCAT(M.first_name, ' ', M.last_name) AS "manager"
        FROM
          employee AS E INNER JOIN role
          ON E.role_id = role.id
            INNER JOIN department
            ON role.department_id = department.id
              LEFT OUTER JOIN employee AS M
              ON E.manager_id = M.id
    `,
    function (error, results, fields) {
      if (error) throw error;
      console.log("\n");
      console.table(results);
      console.log("\n");
    }
  );
}

function viewDepartments() {
  db.query(
    `
        SELECT * FROM department
    `,
    function (error, results, fields) {
      if (error) throw error;
      console.log("\n");
      console.table(results);
      console.log("\n");
    }
  );
}

function viewRoles() {
  db.query(
    `
      SELECT 
        role.id AS id,
        role.title AS title,
        department.name AS "department",
        role.salary AS salary
      FROM 
        role INNER JOIN department
        ON role.department_id = department.id
    `,
    function (error, results, fields) {
      if (error) throw error;
      console.log("\n");
      console.table(results);
      console.log("\n");
    }
  );
}

async function addEmployee() {
  const answers = await inquirer.prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee's last_name",
    },
    {
      name: "role_name",
      type: "input",
      message: "What is the employee's role?",
    },
    {
      name: "manager_name",
      type: "input",
      message: "Who is the employee's manager?",
    },
  ]);

  db.query(
    `
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?,?, (SELECT id FROM role WHERE title = ?), (SELECT id FROM (SELECT id FROM employee WHERE first_name = ? AND last_name = ?) AS E) )
    `,
    [answers["first_name"], answers["last_name"], answers["role_name"], answers["manager_name"].split(" ")[0], answers["manager_name"].split(" ")[1]],
    function (error, results, fields) {
      if (error) throw error;
      // console.log("The solution is: ", results[0].solution);
    }
  );
}

async function addDepartment() {
  const answers = await inquirer.prompt([
    {
      name: "department name",
      type: "input",
      message: "What is the department name?",
    },
  ]);

  db.query(
    `
      INSERT INTO department (name)
      VALUES (?)
    `,
    [answers["department name"]],
    function (error, results, fields) {
      if (error) throw error;
      // console.log("The solution is: ", results[0].solution);
    }
  );
}

async function addRole() {
  const answers = await inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What is the name of the role?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary of the role?",
    },
    {
      name: "department_name",
      type: "input",
      message: "Which department does the role belong to?",
    },
  ]);

  await db.promise().query(
    `
      INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, (SELECT id FROM department WHERE name = ?) )
    `,
    [answers["title"], answers["salary"], answers["department_name"]]
    // function (error, results, fields) {
    //   if (error) throw error;
    // }
  );
}

async function updateRole() {
  const answers = await inquirer.prompt([
    {
      name: "employee",
      type: "input",
      message: "Which employee's role do you want to update?",
    },
    {
      name: "role",
      type: "input",
      message: "What is the employee's new role?",
    },
  ]);

  await db.promise().query(
    `
        UPDATE employee SET
            role_id = (SELECT id FROM role WHERE title = ?)
        WHERE
            first_name = ?
        AND last_name = ?
        
    `,
    [answers["role"], answers["employee"].split(" ")[0], answers["employee"].split(" ")[1]],
    function (error, results, fields) {
      if (error) throw error;
      // console.log("The solution is: ", results[0].solution);
    }
  );
}

async function deleteEmployee() {}

async function exitApp() {}
