import express from "express";
import { searchTracks } from "../controller/spotify.controller.js";
const router = express.Router();

router.get("/search", searchTracks);
export default router;
