import User from "../Models/AboutModel.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


export const getAllAbout = async (req, res) => {
    try {
        const users = await User.find().sort({ _id: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};


export const addAbout = async (req, res) => {
    try {
        const { title, description1, description2 } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        const user = new User({
            title,
            description1,
            description2,
            image,
        });

        await user.save();
        res.status(201).json({ message: "About added successfully", user });
    } catch (error) {
        console.error("Error adding about:", error.message);
        res.status(500).json({ message: "Failed to add About", error: error.message });
    }
};



// Delete a user
export const deleteAbout = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Step 1: Find the team member in the database using the ID
      const teamMember = await User.findById(id);
      if (!teamMember) {
        return res.status(404).send({ message: 'About not found' });
      }
  
      // Step 2: Delete the image from the file system
      const __filename = fileURLToPath(import.meta.url); // Convert the current URL to a file path
      const __dirname = path.dirname(__filename); // Get the directory from the file path
      const baseDir = path.resolve(__dirname, '..');  // Go up one level to the server directory
  
      const imagePath = path.join(baseDir, 'Upload', 'image', 'about', teamMember.image);
  
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
      res.status(200).send({ message: 'About deleted successfully' });
    } catch (err) {
      console.error('Error deleting about:', err);
      res.status(500).send({ message: 'Failed to delete about' });
    }
  };