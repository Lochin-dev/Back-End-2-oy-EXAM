const { Router } = require("express")
const { userupdate, userdelete, userget } = require("../controller/user.js")

const { userValidate } = require("../middleware/user.middleware")

const router = Router();
router.delete("/user/:id", userdelete)
router.get("/user", userget)
router.put("/user/:id", userValidate, userupdate)
module.exports = router