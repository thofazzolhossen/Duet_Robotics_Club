import mongoose from "mongoose";

const advertisementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const advertise = mongoose.model('Advertisement', advertisementSchema);
export default advertise;
