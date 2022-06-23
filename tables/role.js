const connection = require("../sql");

connection.query(
  `
    DROP TABLE IF EXISTS role
  `,
  function (error, results, fields) {
    if (error) throw error;

    connection.query(
      `
          create table role(
              id int primary key AUTO_INCREMENT, 
              title varchar(30),
              salary decimal,
              department_id int
          )
        `,
      function (error, results, fields) {
        if (error) throw error;

        process.exit();
      }
    );
  }
);
