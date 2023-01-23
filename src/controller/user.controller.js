const db = require("../db/db");
const bcrypt = require("bcrypt");
const insertDataService = require("../services/common/insertDataService");
const findSingleDataService = require("../services/common/findSingleDataService");

exports.registration = async (req, res) => {
  try {
    let hashPass = await bcrypt.hash(req.body["password"], 11);
    req.body["password"] = hashPass;

    let query = "INSERT INTO ?? SET ?";
    let data = ["users", req.body];
    const result = await insertDataService(db, query, data);

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

exports.login = async (req, res) => {
  try {
    const query = "SELECT * FROM ?? WHERE ?? = ?";
    const data = ["users", "email", req.body.email];

    let user = await findSingleDataService(db, query, data);

    if (user.length == 0) {
      return res.status(404).json({
        status: "fail",
        data: "Email or password dose not match",
      });
    }

    let isMatch = await bcrypt.compare(req.body["password"], user[0].password);

    if (!isMatch) {
      return res.status(404).json({
        status: "fail",
        data: "Email or password dose not match",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: error.toString(),
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    let email = req.params.email;

    const query = "SELECT id, email, username FROM ?? WHERE ?? = ?";
    const data = ["users", "email", email];

    let user = await findSingleDataService(db, query, data);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      data: error.toString(),
    });
  }
};
