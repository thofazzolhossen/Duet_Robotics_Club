
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    
    
});

const Adminschema = mongoose.model("admin", AdminSchema);

export default Adminschema;
