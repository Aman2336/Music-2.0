import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: string,
      required: true,
      unique: true,
    },
    email: {
      type: string,
      required: true,
      unique: true,
    },
    password: {
      type: string,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", "UserSchema");

export default User;
