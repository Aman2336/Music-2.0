import User from "../model/UserSchema.js";
import { errorhandler } from "../utils/error.js";
export const test = (req, res) => {
  res.json({
    message: "hello world",
  });
};
export const likedsongs = async (req, res) => {
  const { userId, song } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isAlreadyLiked = user.likedSongs.some(
      (likedSong) => likedSong.trackId === song.trackId
    );
    if (isAlreadyLiked) {
      return res.status(400).json({ message: "Song already liked" });
    }

    user.likedSongs.push(song);
    await user.save();
    res.status(200).json({
      message: "Song added to liked songs",
      likedSongs: user.likedSongs,
    });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Error liking song", error });
  }
};

export const removelikedsongs = async (req, res) => {
  const { userId, trackId } = req.body;

  try {
    // Find the user and remove the track from likedSongs
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { likedSongs: { trackId } } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Song removed from liked songs", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorhandler(403, "you can update your account"));
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
        },
      },
      { new: true }
    );
    const data = updatedUser._doc;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
export const deleteuser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorhandler(405, "you can delete only ur own account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");

    res.status(200).json({ message: "user has been deleted!!" });
  } catch (error) {
    next(error);
  }
};
