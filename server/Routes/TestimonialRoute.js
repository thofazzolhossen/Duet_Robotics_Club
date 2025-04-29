import express from "express";
import multer from "multer";
import path from "path";
import { addTestimonial, deleteTestimonial, getAllTestimonial } from "../Controller/TestimonialController.js";

const testimonialRouter = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Upload/image/testimonial"); // Save files to the 'uploads' folder
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
testimonialRouter.get("/view", getAllTestimonial);

// Add a new user (with image upload)
testimonialRouter.post("/add", upload.single("image"), addTestimonial);


// Delete a user
testimonialRouter.delete("/delete/:id", deleteTestimonial);

export default testimonialRouter;
