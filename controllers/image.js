const Image = require("../models/image");

///////////////////////// ADD IMAGE ///////////////////////////

exports.addImage = async (req, res) => {
  const image = new Image({
    email: req.params.email,
    image: req.body.image,
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
  try {
    const image = await Image.findOne({ email: req.params.email });
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    const imageData = Buffer.from(image, "base64");
    res.contentType("image/jpeg");
    console.log("imageData: " + imageData);
    res.send(imageData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while getting image" });
  }
};
