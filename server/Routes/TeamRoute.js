import express from "express";
import multer from "multer";
import { getAllUsers, addUser, updateUser, deleteUser } from "../Controller/TeamContriller.js";
import path from "path";

const teamRouter = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Upload/image/team"); // Save files to the 'uploads' folder
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
teamRouter.get("/view", getAllUsers);

// Add a new user (with image upload)
teamRouter.post("/add", upload.single("image"), addUser);

// Update a user
teamRouter.put("edit/:id", updateUser);

// Delete a user
teamRouter.delete("/delete/:id", deleteUser);

export default teamRouter;
