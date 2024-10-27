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
  },
  {
    timestamps: true, // Combine collection and timestamps into one object
    collection: 'Users',
  }
);

// Use the correct schema reference
const User = mongoose.model("User", UserSchema);

export default User;
