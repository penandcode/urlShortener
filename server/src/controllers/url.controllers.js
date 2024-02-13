const httpStatus = require("http-status");
const { decodeToken } = require("../services/token.services");
const { addUrlToDB, getAllURLfromDB, getByIdFromDB } = require("../services/url.services");
const errorHandler = require("../utils/errorHandler");

const addURL = async (req, res) => {
    try {
        const data = { ...req.body };
        const url = await addUrlToDB(data)
        return res.send(url).status(httpStatus.CREATED);
    } catch (error) {
        return errorHandler(error, res)
    }
}

const getAllURL = async (req, res) => {
    try {
        const userId = req.body.userId;
        const url = await getAllURLfromDB(userId)
        return res.send(url).status(httpStatus.OK)
    } catch (error) {
        return errorHandler(error, res)
    }
}

const getByID = async (req, res) => {
    try {
        const urlId = req.params.id;
        const data = await getByIdFromDB(urlId);
        return res.send(data).status(httpStatus.OK)

    } catch (error) {
        return errorHandler(error, res)
    }
}

module.exports = { addURL, getAllURL, getByID }