import express from "express";
import multer from "multer";
import { getAllEvent, addEvent, deleteEvent } from "../Controller/EventController.js";
import path from "path";

const eventRouter = express.Router();


// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Upload/image/event"); // Save files to the 'uploads' folder
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
eventRouter.get("/viewevent", getAllEvent);
// Add a new user (with image upload)
eventRouter.post("/addevent", upload.single("image"), addEvent);

//delete event
eventRouter.delete("/deleteEvent/:id", deleteEvent);

export default eventRouter;