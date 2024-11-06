import express from "express";
import { mooddetect } from "../controller/mood.controller.js";
const router = express.Router();

router.post("/detect-from-image", mooddetect);
export default router;
