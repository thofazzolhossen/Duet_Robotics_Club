import mongoose from "mongoose";

const countdownSchema = new mongoose.Schema({
    title1: { 
        type: String, 
        required: true, 
    },
    value1: { 
        type: String, 
        required: true, 
    },

    title2: { 
        type: String, 
        required: true, 
    },
    value2: { 
        type: String,
        required: true, 
    },
    title3: { 
        type: String,
        required: true,  
    },
    value3: { 
        type: String,
        required: true,  
    },
});

const Countdown = mongoose.model("Countdown", countdownSchema);

export default Countdown;
