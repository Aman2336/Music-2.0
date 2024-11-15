import express from "express";
import {
  likedsongs,
  removelikedsongs,
  test,
  updateUser,
} from "../controller/user.controller.js";
import User from "../model/UserSchema.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.get("/liked-songs/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Find the user and return their liked songs
    const user = await User.findById(userId).select("likedSongs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ likedSongs: user.likedSongs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
}); //for rendering the liked songs for the current user on reload
router.post("/like-song", likedsongs);
router.post("/remove-like", removelikedsongs);
export default router;
