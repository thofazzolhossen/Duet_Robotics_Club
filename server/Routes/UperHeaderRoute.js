import express from "express";
import { addUperHeader, deleteUperheader, getAllUperHeader } from "../Controller/UperheaderController.js";


const uperheaderRouter = express.Router();



// Get all users
uperheaderRouter.get("/viewuperheader", getAllUperHeader);
// Add a new user (with image upload)
uperheaderRouter.post("/adduperheader", addUperHeader);
//delete event
uperheaderRouter.delete("/deleteuperheader/:id", deleteUperheader);

export default uperheaderRouter;