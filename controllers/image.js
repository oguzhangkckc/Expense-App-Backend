const Image = require("../models/image");

///////////////////////// ADD IMAGE ///////////////////////////

exports.addImage = async (req, res) => {
  const image = new Image({
    name: req.body.name,
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
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.setHeader("Content-Type", image.image.contentType);

    return res.send(image.image.data);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving image" });
  }
};

///////////////////////// DELETE IMAGE ///////////////////////////
