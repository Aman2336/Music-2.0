// export const detectimage = async (req, res, next) => {
//   // const { imagePath } = req.body; // Assume the frontend sends the image path

//   // PythonShell.run('Mood/MoodDetect.py', { args: [imagePath] }, (err, result) => {
//   //   if (err) {
//   //     console.error("Error in Python script:", err);
//   //     return res.status(500).json({ error: "Error running mood detection script." });
//   //   }

//   //   try {
//   //     const emotionResult = JSON.parse(result[0]);
//   //     res.json({ mood: emotionResult.emotion, emotions: emotionResult.emotions });
//   //   } catch (parseError) {
//   //     console.error("Error parsing result:", parseError);
//   //     return res.status(500).json({ error: "Failed to parse result from Python script." });
//   //   }});
//   const { image } = req.body; // Frontend sends base64 image
//   if (!image) {
//     return res.status(400).json({ error: "No image data provided" });
//   }

//   console.log("base 64 : ", image);

//   // Check if image is base64-encoded
//   if (!image.startsWith("data:image/")) {
//     return res.status(400).json({ error: "Invalid image data format" });
//   }

//   // Extract base64 string (remove prefix data:image/png;base64,)
//   const base64Image = image.split(",")[1];

//   // Save the base64 image to a temporary file
//   const imagePath = path.join(__dirname, "temp_image.png");

//   fs.writeFile(imagePath, Buffer.from(base64Image, "base64"), (err) => {
//     if (err) {
//       console.error("Error saving image:", err);
//       return res.status(500).json({ error: "Failed to save image" });
//     }

//     // Call the Python script with the image path
//     PythonShell.run(
//       "Mood/MoodDetect.py",
//       { args: [imagePath] },
//       (err, result) => {
//         if (err) {
//           console.error("Error in Python script:", err);
//           return res
//             .status(500)
//             .json({ error: "Error running mood detection script." });
//         }

//         try {
//           const emotionResult = JSON.parse(result[0]);
//           res.json({
//             mood: emotionResult.emotion,
//             emotions: emotionResult.emotions,
//           });
//         } catch (parseError) {
//           console.error("Error parsing result:", parseError);
//           return res
//             .status(500)
//             .json({ error: "Failed to parse result from Python script." });
//         } finally {
//           // Optionally, remove the temporary image after processing
//           fs.unlink(imagePath, (err) => {
//             if (err) console.error("Error removing temp image:", err);
//           });
//         }
//       }
//     );
//   });
// };

// // Set up multer to save the image temporarily
// const upload = multer({ dest: "uploads/" });

// // Middleware to handle file uploads with multer
// export const detectimage = async (req, res, next) => {
//   // If no file is uploaded, return an error
//   if (!req.file) {
//     return res.status(400).json({ error: "No image file provided" });
//   }

//   // Get the path of the uploaded file
//   const imagePath = req.file.path;

//   // Call the Python script with the image path
//   PythonShell.run("Mood/MoodDetect.py", { args: [imagePath] }, (err, result) => {
//     if (err) {
//       console.error("Error in Python script:", err);
//       return res.status(500).json({ error: "Error running mood detection script." });
//     }

//     try {
//       const emotionResult = JSON.parse(result[0]);
//       res.json({
//         mood: emotionResult.emotion,
//         emotions: emotionResult.emotions,
//       });
//     } catch (parseError) {
//       console.error("Error parsing result:", parseError);
//       return res.status(500).json({ error: "Failed to parse result from Python script." });
//     } finally {
//       // Remove the temporary image after processing
//       fs.unlink(imagePath, (err) => {
//         if (err) console.error("Error removing temp image:", err);
//       });
//     }
//   });
// };

// Route setup with multer middleware

// import { PythonShell } from "python-shell";
// import fs from "fs";
// import path from "path";
// import multer from "multer";

// export const detectimage = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No image file uploaded");
//   }

//   // Path to the uploaded image
//   // const imagePath = path.join(__dirname, req.file.path);
//   const imagePath = path.resolve("uploads", req.file.path);

//   // Python script options
//   const options = {
//     args: [imagePath],
//     scriptPath: "Mood/MoodDetect.py", // Replace with your actual script directory
//   };

//   // Run the Python script
//   PythonShell.run("MoodDetect.py", options, (err, results) => {
//     if (err) {
//       console.error("Error running Python script:", err);
//       return res.status(500).send("Error processing image");
//     }

//     // Parse the result (assuming the Python script prints a JSON string)
//     const analysis = JSON.parse(results[0]);

//     // Send the analysis result back to the client
//     res
//       .status(200)
//       .json({ mood: analysis.emotion, emotions: analysis.emotions });
//   });
// };

// import fs from "fs";
// import path from "path";
// import multer from "multer";
// import canvas from "canvas";
// import * as faceapi from "face-api.js";

// // Define __dirname for ES modules (if needed)
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load the face-api.js models (make sure you have these models in the correct directory)
// const modelPath = path.join(__dirname, "../models");

// export const detectimage = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No image file uploaded");
//   }

//   // Construct the image path to match your 'uploads' directory in the backend
//   const imagePath = path.resolve(__dirname, "../uploads", req.file.filename);
//   console.log("Image path:", imagePath);
//   console.log("File exists:", fs.existsSync(imagePath));

//   // Load the models (you need to have the models folder available in your project)
//   await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
//   await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
//   await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
//   await faceapi.nets.ageGenderNet.loadFromDisk(modelPath);
//   await faceapi.nets.emotionNet.loadFromDisk(modelPath);

//   try {
//     // Read and process the image using canvas
//     const img = await canvas.loadImage(imagePath);
//     const detections = await faceapi.detectAllFaces(img)
//       .withFaceLandmarks()
//       .withFaceDescriptors()
//       .withEmotion();

//     if (detections.length === 0) {
//       return res.status(400).send("No faces detected");
//     }

//     // Get the dominant emotion
//     const emotions = detections[0]?.emotions;
//     if (!emotions) {
//       return res.status(500).send("Error detecting emotions");
//     }

//     const dominantEmotion = Object.keys(emotions).reduce((maxEmotion, currentEmotion) => {
//       return emotions[currentEmotion] > emotions[maxEmotion] ? currentEmotion : maxEmotion;
//     });

//     console.log("Dominant Emotion:", dominantEmotion);

//     // Return only the dominant emotion
//     res.status(200).json({
//       dominantEmotion,
//     });
//   } catch (error) {
//     console.error("Error processing image:", error);
//     res.status(500).send("Error processing image");
//   }
// };

// i

import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const detectimage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image file uploaded");
  }

  const imagePath = path.resolve(__dirname, "../uploads", req.file.filename);

  try {
    const form = new FormData();
    form.append("image", fs.createReadStream(imagePath));

    // Send a request to the Flask server
    const response = await axios.post("http://localhost:5000/analyze", form, {
      headers: form.getHeaders(),
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).send("Error processing image");
  }
};
