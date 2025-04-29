import User from "../Models/Eventmodel.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

//get all event
export const getAllEvent = async (req, res) => {
    try {
        const users = await User.find().sort({ _id: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};

// Add event
export const addEvent = async (req, res) => {
    try {
        const { title, description, description1, description2, description3 } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        const user = new User({
            title,
            description,
            image,
            description1,
            description2,
            description3,

        });

        await user.save();
        res.status(201).json({ message: "Event added successfully", user });
    } catch (error) {
        console.error("Error adding event:", error.message);
        res.status(500).json({ message: "Failed to add event", error: error.message });
    }
};

// Delete a user
export const deleteEvent = async (req, res) => {
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
  
      const imagePath = path.join(baseDir, 'Upload', 'image', 'event', teamMember.image);
  
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
  