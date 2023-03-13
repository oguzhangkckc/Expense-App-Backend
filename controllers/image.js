const Image = require('../models/image');
const mongoose = require('mongoose');

///////////////////////// ADD IMAGE ///////////////////////////

exports.addImage = async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res
            .status(400)
            .json({ message: "Please upload an image" });
        }
        const newImage = await Image.addImage(name, image);
        res.status(201).json(newImage);
    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: "An error occurred while adding image" });
    }
}

///////////////////////// GET IMAGE ///////////////////////////

exports.getImage = async (req, res) => {
    try {
        const images = await Image.find()
        res.status(200).json(images);
    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: "An error occurred while fetching images" });
    }
}

///////////////////////// DELETE IMAGE ///////////////////////////

exports.deleteImage = async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id);
        if (!image)
        return res
            .status(404)
            .json({ success: false, message: "Image not found" });
        res.status(201).json({ success: true, message: "Image deleted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
