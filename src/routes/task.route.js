const router = require("express").Router();
const taskController = require("../controller/task.controller")
const AuthVerify = require("../middleware/AuthVerify")



router.post("/createNewTask", AuthVerify , taskController.createNewTask)

module.exports = router;