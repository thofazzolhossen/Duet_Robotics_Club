import User from "../Models/Countdownmodel.js";

export const getAllCountdown = async (req, res) => {
    try {
        const users = await User.find().sort({ _id: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};



export const addCountdown = async (req, res) => {
    try {
        const { title1, value1, title2, value2, title3, value3 } = req.body;

        const user = new User({
            title1,
            value1,
            title2,
            value2,
            title3,
            value3
        });

        await user.save();
        res.status(201).json({ message: "User added successfully", user });
    } catch (error) {
        console.error("Error adding user:", error.message);
        res.status(500).json({ message: "Failed to add user", error: error.message });
    }
};



// Delete a footer
export const deleteCountdown = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Step 1: Find the team member in the database using the ID
      const teamMember = await User.findById(id);
      if (!teamMember) {
        return res.status(404).send({ message: 'Team member not found' });
      }
  
      // Step 3: Delete the team member from the database
      await User.findByIdAndDelete(id);
      res.status(200).send({ message: 'Countdown deleted successfully' });
    } catch (err) {
      console.error('Error deleting team member:', err);
      res.status(500).send({ message: 'Failed to delete team member' });
    }
};