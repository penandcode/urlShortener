const httpStatus = require("http-status");
const { createUser } = require("../services/user.services");
const catchAsync = require("../utils/catchAsync");
const { userLogin } = require("../services/auth.services");
const ApiError = require("../utils/ApiError");
const errorHandler = require("../utils/errorHandler");

const signup = catchAsync(async (req, res) => {
    try {
        const user = await createUser(req.body);
        console.log(user);
        return res.send(user).status(httpStatus.CREATED)
    } catch (error) {
        return errorHandler(error, res)
    }
})

const login = catchAsync(async (req, res) => {
    try {
        const user = await userLogin(req.body);
        return res.send(user).status(httpStatus.OK)
    } catch (error) {
        return errorHandler(error, res)
    }
})
module.exports = {
    signup,
    login
}