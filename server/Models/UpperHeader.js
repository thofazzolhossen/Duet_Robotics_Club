import mongoose from "mongoose";

const uperheaderSchema = new mongoose.Schema({
    title: { 
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
    
});

const uperheader = mongoose.model("Uperheader", uperheaderSchema);
export default uperheader;
