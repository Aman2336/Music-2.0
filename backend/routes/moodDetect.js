// import express from "express";
// import multer from "multer";
// import { detectimage } from "../controller/mood.controller.js";
// const router = express.Router();
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Ensure this folder exists
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only image files are allowed!"), false);
//     }
//   },
// }); // Max file size: 50MB
import express from "express";
import multer from "multer";
import { detectimage } from "../controller/mood.controller.js"; // Assuming this is your controller
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname in case of ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the uploads directory exists or create it
    const uploadDir = path.join(__dirname, "../uploads");
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create a unique filename to avoid conflicts
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });
const router = express.Router();
router.post("/detect", upload.single("image"), detectimage);
// router.post("/detect", upload.single("image"), (req, res) => {
//   if (req.file) {
//     console.log("File uploaded:", req.file);
//     // Process the file (e.g., image analysis) here
//     res.json({ message: "File uploaded successfully" });
//   } else {
//     res.status(400).json({ message: "No file uploaded" });
//   }
// });
export default router;
