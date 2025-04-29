import mongoose from "mongoose";

const AdvisorForEventModel = new mongoose.Schema({
    mainevent:{
        type: String, 
        required: true,
    },
    subevent:{
        type: String, 
        required: true,
    },
    name: { 
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

const AdvisorForEvent = mongoose.model("AdvisorForEvent", AdvisorForEventModel);

export default AdvisorForEvent;



