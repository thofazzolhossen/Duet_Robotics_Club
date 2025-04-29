import User from "../Models/TestimonialModel.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



// Get all users
export const getAllTestimonial = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch testimonial", error });
    }
};

//add user
export const addTestimonial = async (req, res) => {
    try {
        const { name, position, description} = req.body;
        const image = req.file ? req.file.filename : null;

        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }

        const user = new User({
            name,
            position,
            description,
            image,
        
        });

        await user.save();
        res.status(201).json({ message: "Testimonial added successfully", user });
    } catch (error) {
        console.error("Error adding testimonial:", error.message);
        res.status(500).json({ message: "Failed to add testimonial", error: error.message });
    }
};




// Delete a user
export const deleteTestimonial = async (req, res) => {
  const { id } = req.params;

  try {
    // Step 1: Find the team member in the database using the ID
    const teamMember = await User.findById(id);
    if (!teamMember) {
      return res.status(404).send({ message: 'Testimonial not found' });
    }

    // Step 2: Delete the image from the file system
    const __filename = fileURLToPath(import.meta.url); // Convert the current URL to a file path
    const __dirname = path.dirname(__filename); // Get the directory from the file path
    const baseDir = path.resolve(__dirname, '..');  // Go up one level to the server directory

    const imagePath = path.join(baseDir, 'Upload', 'image', 'testimonial', teamMember.image);

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
    res.status(200).send({ message: 'Testimonial deleted successfully' });
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    res.status(500).send({ message: 'Failed to delete testimonial' });
  }
};
