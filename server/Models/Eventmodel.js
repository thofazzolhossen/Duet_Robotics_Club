import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { 
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
    description1: { 
        type: String,
    },
    description2: { 
        type: String, 
    },
    description3: { 
        type: String, 
    },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
