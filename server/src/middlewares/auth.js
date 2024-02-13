const jwt = require("jsonwebtoken")
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const errorHandler = require("../utils/errorHandler");

require('dotenv').config()

const SECRET = process.env.SECRET;

const auth = (req, res, next, secret = SECRET) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            const decoded = jwt.verify(token.split(" ")[1], secret);
            req.body.userId = decoded.userId
            next();
        } else {
            throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized.")
        }
    } catch (error) {
        return errorHandler(error, res)
    }
}

module.exports = { auth };