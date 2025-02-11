import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png",
    },
    likedSongs: [
      {
        trackId: { type: String },
        title: { type: String },
        artist: { type: String },
        albumArt: { type: String },
        preview_url: { type: String },
      },
    ],
  },
  {
    timestamps: true, // Combine collection and timestamps into one object
    collection: "Users",
  }
);

// Use the correct schema reference
const User = mongoose.model("User", UserSchema);

export default User;
