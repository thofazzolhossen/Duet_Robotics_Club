import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
    },
    description: { 
        type: String, 
        required: true, 
    },

    icon: { 
        type: String, 
        required: true, 
    },
    
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;
