const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    imagePath: {
        type: String,
        required: false,
    },
},{timestamps: true});


module.exports = mongoose.model('Image', imageSchema);