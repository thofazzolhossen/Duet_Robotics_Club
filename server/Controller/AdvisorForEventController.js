import User from "../Models/AdvisorForEventModel.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};

//add user
export const addUser = async (req, res) => {
    try {
        const { mainevent, subevent, name, position, description, facebook, email, linkedin, whatsapp } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
            
        }

        const user = new User({
          mainevent,
           subevent,
            name,
            position,
            description,
            image,
            facebook,
            email,
            linkedin,
            whatsapp,
        });

        await user.save();
        res.status(201).json({ message: "User added successfully", user });
    } catch (error) {
        console.error("Error adding user:", error.message);
        res.status(500).json({ message: "Failed to add user", error: error.message });
    }
};


// Update a user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: "Failed to update user", error });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
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
    const imagePath = path.join(baseDir, 'Upload', 'image', 'advisor', teamMember.image);

    try {
      // Check if the file exists and delete it
      await fs.promises.stat(imagePath);
      await fs.promises.unlink(imagePath);
    } catch (fileError) {
      console.error('Error with file check or deletion:', fileError);
      // Log the error, but don't return here to proceed with user deletion
    }

    // Step 3: Delete the team member from the database
    await User.findByIdAndDelete(id);
    res.status(200).send({ message: 'Team member deleted successfully' });
  } catch (err) {
    console.error('Error deleting team member:', err);
    res.status(500).send({ message: 'Failed to delete team member' });
  }
};

