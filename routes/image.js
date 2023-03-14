const express = require("express");
const { addImage, getImage, deleteImage } = require("../controllers/image");
const imageRouter = express.Router();
const { requireAuth } = require("../middleware/requireAuth");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

imageRouter.use(requireAuth);

imageRouter.post("/add-image", upload.single("image"), addImage);
imageRouter.get("/get-image", getImage);


module.exports = imageRouter;
