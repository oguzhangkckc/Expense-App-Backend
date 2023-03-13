const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    image: {
        data : Buffer,
        contentType : String
    }
},{timestamps: true});


module.exports = mongoose.model('Image', imageSchema);