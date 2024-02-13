const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date, default: Date.now
    }
})


urlSchema.statics.isShortTaken = async function (short) {
    const url = await this.findOne({ short: short }
    )
    if (url) {
        return true;
    }
    return false;
}


const Url = mongoose.model('url', urlSchema)

module.exports = Url;