const Image = require("../models/image");
const fs = require("fs");
const path = require("path");

///////////////////////// ADD IMAGE ///////////////////////////

exports.addImage = async (req, res) => {
  const image = new Image({
    email: req.params.email,
    imagePath: "uploads/image.jpg"
    });
  try {
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while saving image" });
  }
};


///////////////////////// GET IMAGE ///////////////////////////

exports.getImage = async (req, res) => {
  const email = req.params.email;
  try {
    const image = await Image.findOne({ email: email });
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    const imagePath = image.imagePath;
    const absolutePath = path.resolve(__dirname, "../", imagePath);
    fs.readFile(absolutePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error reading image file" });
      } else {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching image" });
  }
};



