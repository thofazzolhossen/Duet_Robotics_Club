import User from "../Models/Certificatemodel.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get all
export const getAllCertificate = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};



// get one
// http://localhost:5000/api/certificate/oneCertificate/abcd_hgj_gfhj_fghfgh_2024

export const getOneCertificate = async (req, res) => {
    try {
        const { code } = req.params; // Extract 'id' from request parameters
        const user = await User.findOne({ code }); // Find user by id

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user); // Send the user data as the response
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user", error });
    }
};



//add
export const addCertificate = async (req, res) => {
    try {
        const { name, event, univarsity, position, year, code } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        const user = new User({
            name,
            event,
            univarsity,
            univarsity,
            position,
            image,
            year,
            code,
        });

        await user.save();
        res.status(201).json({ message: "User added successfully", user });
    } catch (error) {
        console.error("Error adding user:", error.message);
        res.status(500).json({ message: "Failed to add user", error: error.message });
    }
};


// Delete

export const deleteCertificate = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Step 1: Find the team member in the database using the ID
      const teamMember = await User.findById(id);
      if (!teamMember) {
        return res.status(404).send({ message: 'Team member not found' });
      }
  
      // Step 2: Delete the image from the file system
      const __filename = fileURLToPath(import.meta.url); // Convert the current URL to a file path
      const __dirname = path.dirname(__filename); // Get the directory from the file path
      const baseDir = path.resolve(__dirname, '..');  // Go up one level to the server directory
  
      const imagePath = path.join(baseDir, 'Upload', 'image', 'certificate', teamMember.image);
  
      // Check if the file exists before trying to delete
      await fs.promises.stat(imagePath)
        .then(async (stats) => {
          if (stats) {
            // File exists, proceed to delete
            await fs.promises.unlink(imagePath);
          }
        })
        .catch((err) => {
          console.error('Error with file check or deletion:', err);
          return res.status(500).send({ message: 'Failed to delete image' });
        });
  
      // Step 3: Delete the team member from the database
      await User.findByIdAndDelete(id);
      res.status(200).send({ message: 'Team member deleted successfully' });
    } catch (err) {
      console.error('Error deleting team member:', err);
      res.status(500).send({ message: 'Failed to delete team member' });
    }
  };