const connection = require("../../sql");

connection.query(
  `
   DROP TABLE IF EXISTS employee
  `,
  function (error, results, fields) {
    if (error) throw error;

    connection.query(
      `
        create table employee(
            id int primary key AUTO_INCREMENT, 
            first_name varchar(30),
            last_name varchar(30),
            role_id int,
            manager_id int
        )
      `,
      function (error, results, fields) {
        if (error) throw error;

        process.exit();
      }
    );
  }
);
