const mongoose = require('mongoose');
const {token} = require('../../config/config');

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        ref: 'User',
    },
    token: {
        type: String,
        required: true,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index:{expires: token.expiresIn},
    },
    });
    // tokenSchema.index({createdAt: 1}, {expireAfterSeconds: 40});

    const Token = mongoose.model("Token", tokenSchema);

    module.exports = Token;