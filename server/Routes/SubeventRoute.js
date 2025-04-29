import express from "express";
import multer from "multer";
import path from "path";
import { createSubEvent, deleteSubEvent, getAllSubEvents, getSubEventById, updateSubEvent } from "../Controller/SubeventController.js";


const subEventRouter = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Upload/image/subevent"); // Save files to 'Upload/image/subevent'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|mp4|avi/; // Allow images and videos
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error("Only images (jpeg, jpg, png) and videos (mp4, avi) are allowed."));
        }
    },
});

// Routes for SubEvent
subEventRouter.get("/viewsubevent", getAllSubEvents);
subEventRouter.get("/:id", getSubEventById);
subEventRouter.post(
    "/addsubevent",
    upload.fields([{ name: "imageOrVideo", maxCount: 1 }, { name: "demoPicture", maxCount: 1 }]),
    createSubEvent
);
subEventRouter.put("/:id", upload.fields([{ name: "imageOrVideo" }, { name: "demoPicture" }]), updateSubEvent);
subEventRouter.delete("/deletesubevent/:id", deleteSubEvent);

export default subEventRouter;
