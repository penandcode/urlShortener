const httpStatus = require("http-status");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/ApiError");

const getUserById = async (id) => {
    const user = await User.findById(id, { name: 1, email: 1 });
    return user;
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
}

const createUser = async (userData) => {
    const { name, email, password } = userData;
    if (!name || !email || !password) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Enter all the required fields.")
    }
    const isEmailTaken = await User.isEmailTaken(email)
    if (isEmailTaken) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists.")

    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = await User.create({ ...userData, "password": hashedPassword });
    return data;
}

module.exports = { getUserById, getUserByEmail, createUser }