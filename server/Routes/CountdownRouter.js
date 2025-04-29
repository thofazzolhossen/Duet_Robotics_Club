import express from "express";
import { addCountdown, deleteCountdown, getAllCountdown } from "../Controller/CountdownController.js";

const countdownRouter = express.Router();



// Get all users
countdownRouter.get("/viewcountdown", getAllCountdown);
// Add a new user (with image upload)
countdownRouter.post("/addcountdown", addCountdown);
//delete event
countdownRouter.delete("/deletecountdown/:id", deleteCountdown);

export default countdownRouter;