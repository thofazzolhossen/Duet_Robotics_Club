import User from "../Models/FooterModel.js";

export const getAllFooter = async (req, res) => {
    try {
        const users = await User.find().sort({ _id: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch footer", error });
    }
};


export const addFooter = async (req, res) => {
    try {
        const { title, address, number, email, twitar, facebook, youtube,instagram,linkedin } = req.body;

        const user = new User({
            title,
            address,
            number,
            email,
            twitar,
            facebook,
            youtube,
            instagram,
            linkedin,
        });

        await user.save();
        res.status(201).json({ message: "Footer added successfully", user });
    } catch (error) {
        console.error("Error adding footer:", error.message);
        res.status(500).json({ message: "Failed to add footer", error: error.message });
    }
};


export const deleteFooter = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Step 1: Find the team member in the database using the ID
      const teamMember = await User.findById(id);
      if (!teamMember) {
        return res.status(404).send({ message: 'Footer not found' });
      }
  
      // Step 3: Delete the team member from the database
      await User.findByIdAndDelete(id);
      res.status(200).send({ message: 'Footer deleted successfully' });
    } catch (err) {
      console.error('Error deleting footer:', err);
      res.status(500).send({ message: 'Failed to delete footer' });
    }
};