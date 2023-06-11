const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Token = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: { type: String, required: true, select: true }
})

module.exports = mongoose.model('Token', Token);