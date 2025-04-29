import User from "../Models/UpperHeader.js";


export const getAllUperHeader = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch header", error });
    }
};




export const addUperHeader = async (req, res) => {
    try {
        const { title, description1, description2 } = req.body;

        const user = new User({
            title,
            description1,

            description2,
            
        });

        await user.save();
        res.status(201).json({ message: "Header added successfully", user });
    } catch (error) {
        console.error("Error adding header:", error.message);
        res.status(500).json({ message: "Failed to add header", error: error.message });
    }
};


export const deleteUperheader = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Step 1: Find the team member in the database using the ID
      const teamMember = await User.findById(id);
      if (!teamMember) {
        return res.status(404).send({ message: 'Header not found' });
      }
  
      // Step 3: Delete the team member from the database
      await User.findByIdAndDelete(id);
      res.status(200).send({ message: 'Header deleted successfully' });
    } catch (err) {
      console.error('Error deleting Header:', err);
      res.status(500).send({ message: 'Failed to delete Header' });
    }
  };