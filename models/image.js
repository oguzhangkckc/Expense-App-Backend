const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type : Buffer,
        contentType : String
    }
},{timestamps: true});


module.exports = mongoose.model('Image', imageSchema);