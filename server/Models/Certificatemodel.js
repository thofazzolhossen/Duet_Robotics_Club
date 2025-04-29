import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
    },

    event: { 
        type: String, 
        required: true, 
    },
    univarsity: { 
        type: String, 
        required: true, 
    },
    
    position: { 
        type: String, 
        required: true, 
    },
    image: {
        type: String, 
        required: true,
    },
    year: {
        type: String, 
        required: true, 
    },
    code: {
        type: String, 
        required: true, 
    },
    
    
});

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;
