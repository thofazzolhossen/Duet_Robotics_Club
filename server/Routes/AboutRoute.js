import express from "express";
import multer from "multer";
import path from "path";
import { addAbout, deleteAbout, getAllAbout } from "../Controller/AboutController.js";

const aboutRouter = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Upload/image/about"); // Save files to the 'uploads' folder
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



// Add a new user (with image upload)
//http://localhost:5000/api/achive/add
aboutRouter.post("/addAbout", upload.single("image"), addAbout);
aboutRouter.get("/getAllAbout", getAllAbout);
// Delete a user
aboutRouter.delete("/deleteAbout/:id", deleteAbout);




export default aboutRouter;
