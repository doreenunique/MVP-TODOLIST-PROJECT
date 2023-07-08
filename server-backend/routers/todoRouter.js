const router = require("express").Router();
const userController = require("../controllers/todoController");

router.post("/signup",todoController.signup);
router.post("/login", todoController.login);
router.post("/verify", todoController.verify);

module.exports = router;