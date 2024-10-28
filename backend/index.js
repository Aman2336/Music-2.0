import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRouter from "./routes/UserRoutes.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.mongo)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(express.json());
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

// adding middlewares
app.use("/backend/user", UserRouter);
app.use("/backend/auth", authRouter);

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
