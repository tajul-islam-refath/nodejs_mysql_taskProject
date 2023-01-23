const db = require("../db/db");

exports.createUserTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  )`;

  db.query(query, (err) => {
    if (err) {
      console.log(err);
      console.log("User table create fail");
    } else {
      console.log("User table create success");
    }
  });
};

exports.createTasksTable = () => {
  const query = `CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    status VARCHAR(255),
    userEmail VARCHAR(255),
    FOREIGN KEY (userEmail) REFERENCES users(email)
)`;

  db.query(query, (err) => {
    if (err) {
      console.log(err);
      console.log("tasks table create fail");
    } else {
      console.log("tasks table create success");
    }
  });
};
