import express from "express";
import {
  fetchtracksbymood,
  fetchtracksforartist,
  searchTracks,
} from "../controller/spotify.controller.js";
const router = express.Router();

router.get("/search", searchTracks);
router.get("/search-mood", fetchtracksbymood);
router.get("/artists-songs/:artistId/top-tracks", fetchtracksforartist);
export default router;
