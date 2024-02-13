const jwt = require("jsonwebtoken")
require('dotenv').config()

const SECRET = process.env.SECRET;

const generateToken = (payload, secretKey = SECRET, expiresIn = '24h') => {
    return jwt.sign(payload, secretKey, { expiresIn })
}

module.exports = {
    generateToken,
}