import User from "../Models/ServicesModel.js";



export const getAllService = async (req, res) => {
    try {
        const users = await User.find().sort({ _id: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch services", error });
    }
};



export const addService = async (req, res) => {
    try {
        const { title, description, icon} = req.body;

        const user = new User({
            title, description, icon,
        });

        await user.save();
        res.status(201).json({ message: "Service added successfully", user });
    } catch (error) {
        console.error("Error adding services:", error.message);
        res.status(500).json({ message: "Failed to add services", error: error.message });
    }
};



// Delete a user
export const deleteService = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Step 1: Find the team member in the database using the ID
      const teamMember = await User.findById(id);
      if (!teamMember) {
        return res.status(404).send({ message: 'Services not found' });
      }
  
      // Step 3: Delete the team member from the database
      await User.findByIdAndDelete(id);
      res.status(200).send({ message: 'Service deleted successfully' });
    } catch (err) {
      console.error('Error deleting service:', err);
      res.status(500).send({ message: 'Failed to delete service' });
    }
  };