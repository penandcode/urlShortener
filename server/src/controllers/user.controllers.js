const httpStatus = require("http-status");
const { getUserById } = require("../services/user.services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const getUser = catchAsync(async (req, res) => {
    try {
        if (req.params.id != req.body.userId) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized.")
        }
        const user = await getUserById(req.params.id);
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "User not found.")
        }
        return res.send(user).status(httpStatus.FOUND);
    } catch (error) {
    }
})

module.exports = {
    getUser
}