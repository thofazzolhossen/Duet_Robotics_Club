import express from "express";
import { addService, deleteService, getAllService } from "../Controller/ServicesController.js";


const serviceRouter = express.Router();



// Get all users
serviceRouter.get("/viewserviceRouter", getAllService);
// Add a new user (with image upload)
serviceRouter.post("/addserviceRouter", addService);
//delete event
serviceRouter.delete("/deleteserviceRouter/:id", deleteService);

export default serviceRouter;