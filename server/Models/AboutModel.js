import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
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
    image: { 
        type: String, 
        required: true, 
    },

});

const About = mongoose.model("About", aboutSchema);

export default About;
