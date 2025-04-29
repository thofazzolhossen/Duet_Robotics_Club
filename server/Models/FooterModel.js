import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
    },
    address: { 
        type: String, 
        required: true, 
    },

    number: { 
        type: String, 
        required: true, 
    },
    email: { 
        type: String,
        required: true, 
    },
    twitar: { 
        type: String,
        required: true,  
    },
    facebook: { 
        type: String,
        required: true,  
    },
    youtube: { 
        type: String,
        required: true,  
    },
    instagram: { 
        type: String,
        required: true,  
    },
    linkedin: {
        type: String,
        required: true,  
    },
});

const Footer = mongoose.model("Footer", footerSchema);
export default Footer;
