const httpStatus = require("http-status");
const Url = require("../models/url.model");
const ApiError = require("../utils/ApiError");
const generateShort = require("../utils/generateShort")

const addUrlToDB = async (data) => {
    if (!data.userId || !data.url) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Enter all the required fields.")
    }
    if (data.short) {
        const urlTaken = await Url.isShortTaken(data.short);
        if (urlTaken) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Url already exists.")
        }
    } else {
        data.short = generateShort()
    }
    const url = await Url.create(data);
    const result = await getAllURLfromDB(data.userId);
    return result
}

const getAllURLfromDB = async (userId) => {
    if (!userId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Please send user id.")
    }
    const url = await Url.find({ userId: userId });
    console.log(url);
    return url;
}

const getByIdFromDB = async (urlId) => {
    const url = await Url.findOne({ "short": urlId });
    if (!url) {
        throw new ApiError(httpStatus.NOT_FOUND, "Link does not exists.")
    }
    url.clicks += 1;
    await url.save();
    return url;

}

module.exports = { addUrlToDB, getAllURLfromDB, getByIdFromDB }