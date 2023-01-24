const router = require("express").Router();
const userController = require("../controller/user.controller")
const AuthVerify = require("../middleware/AuthVerify")

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/userDetails",AuthVerify, userController.getUserDetails);
module.exports = router;