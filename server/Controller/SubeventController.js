
import { fileURLToPath } from 'url';  // Import the fileURLToPath function
import path from 'path';
import fs from 'fs';  // Assuming fs is being used for file deletion
import SubEvent from "../Models/SubEventModel.js";


export const createSubEvent = async (req, res) => {
    try {
        const { eventName, header, description1, description2, links } = req.body;
        
        const imageOrVideo = req.files?.imageOrVideo ? req.files.imageOrVideo[0].filename : null;
        const demoPicture = req.files?.demoPicture ? req.files.demoPicture[0].filename : null;

        if (!eventName || !header || !description1 || !description2 || !links) {
            return res.status(400).json({ message: "Please fill all required fields." });
        }

        const newSubEvent = new SubEvent({
            eventName,
            imageOrVideo,
            header,
            description1,
            demoPicture,
            description2,
            links,
        });

        const savedSubEvent = await newSubEvent.save();
        res.status(201).json(savedSubEvent);
    } catch (error) {
        console.error("Error creating sub-event:", error);
        res.status(500).json({ message: "Server error while creating sub-event.", error });
    }
};


// @desc    Get all SubEvents
// @route   GET /api/subevents
export const getAllSubEvents = async (req, res) => {
    try {
        const subEvents = await SubEvent.find();
        res.status(200).json(subEvents);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch sub-events.", error });
    }
};

// @desc    Get a single SubEvent by ID
// @route   GET /api/subevents/:id
export const getSubEventById = async (req, res) => {
    try {
        const subEvent = await SubEvent.findById(req.params.id);
        if (!subEvent) {
            return res.status(404).json({ message: "Sub-event not found." });
        }
        res.status(200).json(subEvent);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving sub-event.", error });
    }
};

export const updateSubEvent = async (req, res) => {
    try {
        const updatedSubEvent = await SubEvent.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedSubEvent) {
            return res.status(404).json({ message: "Sub-event not found." });
        }

        res.status(200).json(updatedSubEvent);
    } catch (error) {
        res.status(500).json({ message: "Error updating sub-event.", error });
    }
};

// @desc    Delete a SubEvent
// @route   DELETE /api/subevents/:id
export const deleteSubEvent = async (req, res) => {
    const { id } = req.params;

    try {
        // Step 1: Find the sub-event in the database
        const subEvent = await SubEvent.findById(id);
        if (!subEvent) {
            console.error('Sub event not found with ID:', id);
            return res.status(404).send({ message: 'Sub event not found' });
        }
        console.log(subEvent._id);

        // Step 2: Define base directory for file paths
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const baseDir = path.resolve(__dirname, '..');

        // Step 3: Get file paths dynamically
        const filePaths = [
            subEvent.imageOrVideo ? path.join(baseDir, 'Upload', 'image', 'subevent', subEvent.imageOrVideo) : null,
            subEvent.demoPicture ? path.join(baseDir, 'Upload', 'image', 'subevent', subEvent.demoPicture) : null
        ].filter(Boolean); // Remove null values

        console.log('Files to delete:', filePaths);

        // Helper function to delete a file
        const deleteFile = async (filePath) => {
            try {
                console.log(`Checking if file exists: ${filePath}`);
                await fs.promises.access(filePath); // Check if file exists
                console.log(`Attempting to delete: ${filePath}`);
                await fs.promises.unlink(filePath); // Delete the file
                console.log(`Deleted file: ${filePath}`);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    console.warn(`File not found, skipping: ${filePath}`);
                } else {
                    console.error(`Error deleting file: ${filePath}`, err);
                    throw err; // Only throw an error if it's NOT a "file not found" error
                }
            }
        };

        // Step 4: Delete both files (if they exist)
        await Promise.all(filePaths.map(deleteFile));

        // Step 5: Delete the sub-event from the database
        console.log(`Deleting sub-event with ID: ${id}`);
        await SubEvent.findByIdAndDelete(id);

        // Step 6: Respond with success
        console.log('Sub event deleted successfully');
        res.status(200).send({ message: 'Sub event deleted successfully' });
    } catch (err) {
        console.error('Error deleting sub event:', err.message, err.stack);
        res.status(500).send({ message: 'Failed to delete sub event', error: err.message });
    }
};
