const httpStatus = require("http-status");
const { addURL, getAllURL, getByID } = require("../controllers/url.controllers");
const { auth } = require("../middlewares/auth");
const URL = require("../models/url.model");
const ApiError = require("../utils/ApiError");
const router = require("express").Router();

router.post("/add", auth, addURL);
router.get("/", auth, getAllURL)

router.get("/:id", getByID)


module.exports = router;
