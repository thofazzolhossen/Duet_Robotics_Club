import mongoose from "mongoose";

const slideSchema = new mongoose.Schema({
    image: { 
        type: String, 
        required: true, 
    },
    title1: { 
        type: String, 
        required: true, 
    },
    title2: { 
        type: String, 
        required: true, 
    },
    title3: { 
        type: String, 
        required: true, 
    }
});

const Slide = mongoose.model("Slider", slideSchema);

export default Slide;



