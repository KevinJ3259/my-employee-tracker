require("dotenv").config();
require("console.table");
// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: process.env.DB_USER,
//   password: process.env.DB_PW,
//   database: process.env.DB_NAME,
// });

// connection.connect();

const connection = require("./sql");

const inquirer = require("inquirer");

start();

async function start() {
  try {
    const answers = await inquirer.prompt([
      {
        name: "what to do",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role"],
      },
    ]);

    // --------------------------------------------------------------------
    // READ
    // --------------------------------------------------------------------
    if (answers["what to do"] == "View Departments") {
      connection.query(
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
    if (answers["what to do"] == "View Roles") {
      connection.query(
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
    if (answers["what to do"] == "View Employees") {
      connection.query(
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

    // --------------------------------------------------------------------
    // CREATE
    // --------------------------------------------------------------------
    if (answers["what to do"] == "Add Department") {
      const answers = await inquirer.prompt([
        {
          name: "department name",
          type: "input",
          message: "What is the department name?",
        },
      ]);

      connection.query(
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

    if (answers["what to do"] == "Add Role") {
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

      connection.query(
        `
            INSERT INTO role (title, salary, department_id)
            VALUES (?,?, (SELECT id FROM department WHERE name = ?) )
          `,
        [answers["title"], answers["salary"], ["department_name"]],
        function (error, results, fields) {
          if (error) throw error;
          // console.log("The solution is: ", results[0].solution);
        }
      );
    }
    if (answers["what to do"] == "Add Employee") {
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

      connection.query(
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
    // --------------------------------------------------------------------
    // UPDATE
    // --------------------------------------------------------------------

    // Update an employee's role.
    if (answers["what to do"] == "Update Employee Role") {
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

      connection.query(
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

    // --------------------------------------------------------------------
    // DELETE
    // --------------------------------------------------------------------

    start();

    // connection.end();
  } catch (error) {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error(error);
    } else {
      // Something else went wrong
      console.error(error);
    }
  }
}

// connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
//   if (error) throw error;
//   console.log("The solution is: ", results[0].solution);
// });
