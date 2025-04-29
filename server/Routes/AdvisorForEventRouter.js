import express from "express";
import multer from "multer";
import { getAllUsers, addUser, updateUser, deleteUser } from "../Controller/AdvisorForEventController.js";
import path from "path";

const advisorRouter = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Upload/image/advisor"); // Save files to the 'uploads' folder
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
advisorRouter.get("/view", getAllUsers);

// Add a new user (with image upload)
advisorRouter.post("/add", upload.single("image"), addUser);

// Update a user
advisorRouter.put("edit/:id", updateUser);

// Delete a user
advisorRouter.delete("/delete/:id", deleteUser);

export default advisorRouter;
