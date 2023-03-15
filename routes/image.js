const express = require("express");
const { addImage, getImage } = require("../controllers/image");
const imageRouter = express.Router();
const { requireAuth } = require("../middleware/requireAuth");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
  });
  
  const upload = multer({ storage: storage });

imageRouter.use(requireAuth);

imageRouter.post("/add-image/:email", upload.single('image'), addImage);
imageRouter.get("/get-image/:email", getImage);


module.exports = imageRouter;
