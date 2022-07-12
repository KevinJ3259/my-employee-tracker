require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

// connects to sql server and sql database
// db.connect(function (err) {
//   if (err) throw err;
//   options();
// });

module.exports = db;
