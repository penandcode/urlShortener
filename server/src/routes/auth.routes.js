const { signup, login } = require("../controllers/auth.controllers");
const { test } = require("../middlewares/testMiddleware");

const router = require("express").Router();

router.post("/signup", signup)
router.post("/login", login)

module.exports = router;
