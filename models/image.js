const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type : Buffer,
        contentType : String,
        required: true
    }
},{timestamps: true});


module.exports = mongoose.model('Image', imageSchema);