const router = require("express").Router();
const userController = require("../controller/user.controller")


router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/userDetails/:email", userController.getUserDetails);
module.exports = router;