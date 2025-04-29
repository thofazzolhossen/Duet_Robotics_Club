import mongoose from "mongoose";

const achiveSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
    },

    image: { 
        type: String, 
        required: true, 
    },
    maintitle: { 
        type: String, 
        required: true, 
    },
    
    description1: { 
        type: String, 
        required: true, 
    },
    description2: { 
        type: String, 
        required: true,
    },
    description3: {
        type: String, 
        required: true, 
    },
    
    
});

const Achive = mongoose.model("Achive", achiveSchema);

export default Achive;
