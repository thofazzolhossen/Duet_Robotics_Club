import express from "express";
import { addFooter, deleteFooter, getAllFooter } from "../Controller/FooterController.js";

const footerRouter = express.Router();



// Get all users
footerRouter.get("/viewfooter", getAllFooter);
// Add a new user (with image upload)
footerRouter.post("/addfooter", addFooter);
//delete event
footerRouter.delete("/deletefooter/:id", deleteFooter);

export default footerRouter;