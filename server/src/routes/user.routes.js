const { getUser } = require("../controllers/user.controllers");
const { auth } = require("../middlewares/auth");
const router = require("express").Router();

router.get("/:id", auth, getUser)

module.exports = router;
