import mongoose from "mongoose";

const SubEventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    imageOrVideo: { type: String, required: true },
    header: { type: String, required: true },
    description1: { type: String, required: true },
    demoPicture: { type: String },
    description2: { type: String, required: true },
    links: { type: String, required: true },
}, { timestamps: true });

const subEvents = mongoose.model("SubEvent", SubEventSchema);
export default subEvents;