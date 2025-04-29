import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { addAdvertisement, deleteAdvertisement, getAllAdvertisement } from "../Controller/advertisementController.js";
const advertisementRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/image/advertisement");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
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
advertisementRouter.post("/add", upload.single("image"), addAdvertisement);
advertisementRouter.get("/getAllAdvertisement", getAllAdvertisement);
advertisementRouter.delete("/deleteAdvertisement/:id", deleteAdvertisement);
advertisementRouter.put("/editAdvertisement/:id");
export default advertisementRouter;
