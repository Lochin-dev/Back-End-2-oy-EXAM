const { Router } = require("express")
const { register, login } = require("../controller/auth.js")

const { userValidate } = require("../middleware/user.middleware")

const router = Router();
router.post("/register", userValidate, register)
router.post("/login", login)
module.exports = router