const express = require("express");
const cors = require("cors"); // Import CORS
const mongoose = require("mongoose");
const axios = require("axios");
const FormData = require("form-data");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all origins

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Image Schema
const imageSchema = new mongoose.Schema({
  prompt: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});
const Image = mongoose.model("Image", imageSchema);

// Generate Image Route
app.post("/api/generate-image", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  
  try {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "webp");

    const headers = {
      Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
      Accept: "image/*",
      ...formData.getHeaders(),
    };

    const response = await axios.post(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      formData,
      { headers, responseType: "arraybuffer" }
    );

    const base64Image = Buffer.from(response.data).toString("base64");
    const imageUrl = `data:image/webp;base64,${base64Image}`;

    const newImage = new Image({ prompt, imageUrl });
    await newImage.save();

    res.status(200).json({ imageUrl });

  } catch (err) {
    console.error("Error generating image:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate image", details: err.response?.data || err.message });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("AI Image Generator API is running!");
});

