const connection = require("./sql");

connection.query(
  `
    INSERT INTO department( name )
    VALUES( 'Service' ),
    ( 'Billing' )
  `,
  function (error, results, fields) {
    if (error) throw error;

    connection.query(
      `
        INSERT INTO role( title, salary, department_id )
        VALUES( 'Customer Service', 80000, 1 ),
        ( 'Billing Clerk', 50000, 2 )
    `,
      function (error, results, fields) {
        if (error) throw error;

        connection.query(
          `
              INSERT INTO employee( first_name, last_name, role_id, manager_id )
              VALUES( 'John', 'Smith', 1, NULL ),
              ( 'Stan', 'Brown', 1, 1 )
          `,
          function (error, results, fields) {
            if (error) throw error;

            process.exit();
          }
        );
      }
    );
  }
);
