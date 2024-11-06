import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import UserRouter from "./routes/UserRoutes.js";
import authRouter from "./routes/authRoutes.js";
import spotifyRouter from "./routes/spotifyRoutes.js";
import moodRouter from "./routes/moodDetect.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.mongo)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

// adding middlewares
app.use("/backend/user", UserRouter);
app.use("/backend/auth", authRouter);
app.use("/backend/spotify", spotifyRouter);
app.use("/backend/mood", moodRouter);
//error handler middleware
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "internal server error";
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});
