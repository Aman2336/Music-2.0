import express from "express";
import { fetchtracksbymood, searchTracks } from "../controller/spotify.controller.js";
const router = express.Router();

router.get("/search", searchTracks);
router.get("/search-mood",fetchtracksbymood);
export default router;
