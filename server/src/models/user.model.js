const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error(
                    "Password must contain at least one letter and one number"
                );
            }
        },
    },
    url: {
        type: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email: email.toLowerCase() }
    )
    if (user) {
        return true;
    }
    return false;
}


userSchema.methods.isPasswordMatch = async function (password) {
    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model('user', userSchema)

module.exports = User;