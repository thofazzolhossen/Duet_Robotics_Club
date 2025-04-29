import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
    },
    position: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
        required: true, 
    },
    image: { 
        type: String, 
        required: true, 
    },
    facebook: { 
        type: String, 
        required: true, 
        
    },
    email: { 
        type: String, 
        required: true, 
        
    },
    linkedin: { 
        type: String, 
        required: true, 
         
    },
    whatsapp: { 
        type: String, 
        required: true, 
    },
});

const Team = mongoose.model("Team", teamSchema);

export default Team;



