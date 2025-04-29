import express from "express";
import multer from "multer";
import path from "path";
import { addAchive, deleteAchive, getAllAchive } from "../Controller/AchiveController.js";

const achiveRouter = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Upload/image/achive"); // Save files to the 'uploads' folder
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
achiveRouter.post("/add", upload.single("image"), addAchive);
achiveRouter.get("/getAllAchive", getAllAchive);
// Delete a user
achiveRouter.delete("/deleteAchive/:id", deleteAchive);
achiveRouter.put("editachive/:id");




export default achiveRouter;
