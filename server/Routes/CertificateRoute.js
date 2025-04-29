import express from "express";
import multer from "multer";
import { addCertificate, deleteCertificate, getAllCertificate, getOneCertificate } from "../Controller/CertificateController.js";
import path from "path";


const certificateRouter = express.Router();


// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Upload/image/certificate"); // Save files to the 'uploads' folder
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
certificateRouter.post("/add", upload.single("image"), addCertificate);
//get all
certificateRouter.get("/allCertificate", getAllCertificate);
//get one by code
certificateRouter.get("/oneCertificate/:code", getOneCertificate);
//delete one by id
certificateRouter.delete("/deleteCertificate/:id", deleteCertificate);



export default certificateRouter;