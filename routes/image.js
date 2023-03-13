const express = require("express");
const { addImage, getImage, deleteImage } = require("../controllers/image");
const imageRouter = express.Router();
const { requireAuth } = require("../middleware/requireAuth");

imageRouter.use(requireAuth);

imageRouter.post("/add-image", addImage);
imageRouter.get("/get-image", getImage);
imageRouter.delete("/delete/:id", deleteImage);


module.exports = imageRouter;
