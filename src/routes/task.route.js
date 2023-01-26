const router = require("express").Router();
const taskController = require("../controller/task.controller")
const AuthVerify = require("../middleware/AuthVerify")


router.get("/taskList", AuthVerify , taskController.getTaskList)
router.get("/task/:id", AuthVerify , taskController.getSingleTask)
router.post("/createNewTask", AuthVerify , taskController.createNewTask)


module.exports = router;