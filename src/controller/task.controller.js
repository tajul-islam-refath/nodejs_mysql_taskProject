const db = require("../db/db");
const insertDataService = require("../services/common/insertDataService");
const findSingleDataService = require("../services/common/findSingleDataService");
const findDataService = require("../services/common/findDataService");

exports.createNewTask = async (req, res) => {
  try {
    let email = req.headers["email"];
    let task = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      userEmail: email,
    };
    let query = "INSERT INTO tasks SET ?";
    let data = [task];
    let result = await insertDataService(db, query, data);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: error.toString(),
    });
  }
};

exports.getTaskList = async (req, res) => {
  try {
    let email = req.headers["email"];
    let query = "SELECT * FROM tasks WHERE userEmail = ?";
    let data = [email];
    let result = await findDataService(db, query, data);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: error.toString(),
    });
  }
};

exports.getSingleTask = async (req, res) => {
  try {
    let email = req.headers["email"];
    let id = req.params.id;
    let query = "SELECT * FROM tasks WHERE id = ? and userEmail = ?";
    let data = [id, email];
    let result = await findSingleDataService(db, query, data);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: error.toString(),
    });
  }
};
