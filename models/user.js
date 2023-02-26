const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique: false,
    },
    password: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: false,
    },
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);