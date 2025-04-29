import Advertisement from "../Models/Advertisement.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const getAllAdvertisement = async (req, res) => {
  try {
    const ads = await Advertisement.find();
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch advertisements", error });
  }
};
export const addAdvertisement = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }
    const newAd = new Advertisement({ name, image });
    await newAd.save();
    res.status(201).json({ message: "Advertisement added successfully", newAd });
  } catch (error) {
    res.status(500).json({ message: "Failed to add advertisement", error: error.message });
  }
};
export const deleteAdvertisement = async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await Advertisement.findById(id);
    if (!ad) {
      return res.status(404).json({ message: "Advertisement not found" });
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const baseDir = path.resolve(__dirname, '..');
    const imagePath = path.join(baseDir, 'Upload', 'image', 'advertisement', ad.image);
    await fs.promises.stat(imagePath)
      .then(async () => {
        await fs.promises.unlink(imagePath);
      })
      .catch(() => {
        return res.status(500).json({ message: "Failed to delete image" });
      });
    await Advertisement.findByIdAndDelete(id);
    res.status(200).json({ message: "Advertisement deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete advertisement", error: err.message });
  }
};
