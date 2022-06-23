const connection = require("../sql");

connection.query(
  `
    DROP TABLE IF EXISTS department
  `,
  function (error, results, fields) {
    if (error) throw error;

    connection.query(
      `
        create table department(
            id int primary key AUTO_INCREMENT, 
            name varchar(30)
        )
      `,
      function (error, results, fields) {
        if (error) throw error;

        process.exit();
      }
    );
  }
);
