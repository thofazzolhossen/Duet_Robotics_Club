import express from "express";
import multer from "multer";
import path from "path";
import { addSlider, deleteSlider, getAllSlider } from "../Controller/SliderController.js";

const slideRouter = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Upload/image/slider"); // Save files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Optional: Restrict file types
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png) are allowed."));
    }
  },
});

// Get all users
slideRouter.get("/view", getAllSlider);

// Add a new user (with image upload)
slideRouter.post("/add", upload.single("image"), addSlider);



// Delete a user
slideRouter.delete("/delete/:id", deleteSlider);

export default slideRouter;
