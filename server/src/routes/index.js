const routes = require("express").Router();
const userRoute = require("./user.routes");
const authRoute = require("./auth.routes")
const urlRoute = require("./url.routes");
const { test } = require("../middlewares/testMiddleware");


routes.use("/user", userRoute);
routes.use("/auth", authRoute);
routes.use("/url", urlRoute);

module.exports = routes;
