const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { readdirSync } = require("fs");
const connection = require("./src/db/db");
const app = express();

// import db tables
const model = require("./src/model/models")

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// implement routes
readdirSync("./src/routes").map((r) =>
  app.use("/api/v1", require(`./src/routes/${r}`))
);

connection.connect((err) => {
  if (err) {
    console.log("Database connect fail!", err);
  } else {
    app.listen(5000, () => {
      console.log("Database connect success");
      console.log("Application running on port", 5000);
      model.createUserTable();
      model.createTasksTable();
    });
  }
});
