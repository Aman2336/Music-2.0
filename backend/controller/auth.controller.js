import User from "../model/UserSchema.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/error.js";

export const login = (req, res) => {};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body; //from req's body fetching info in an object
  const hashpwd = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashpwd });
  try {
    await newUser.save();
    res.status(201).json("User created Successfully");
  } catch (err) {
    next(errorhandler(500, "error from errorhandler"));
  }
};
