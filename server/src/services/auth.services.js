const httpStatus = require("http-status");
const { generateToken } = require("./token.services");
const ApiError = require("../utils/ApiError");
const { getUserByEmail } = require("./user.services");

const userLogin = async (userData) => {
    const { email, password } = userData
    if (!email || !password) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Enter your details carefully.")
    }
    const user = await getUserByEmail(email);
    if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email.")
    }
    const isPasswordMatch = await user.isPasswordMatch(password);
    if (user && isPasswordMatch) {
        const token = await generateToken({ name: user.name, email: user.email, userId: user._id });
        return { user: { name: user.name, email: user.email, _id: user._id }, token: token }
    }
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect credentials.")
}

module.exports = { userLogin }