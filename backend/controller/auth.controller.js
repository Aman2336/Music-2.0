import User from "../model/UserSchema.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body; //from req's body fetching info in an object
  const hashpwd = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashpwd });
  try {
    await newUser.save();
    res.status(201).json("User created Successfully");
  } catch (err) {
    next(errorhandler(500, "error"));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validuser = await User.findOne({ email });
    if (!validuser) {
      return next(errorhandler(404, "Invalid User"));
    }
    const validpassword = bcryptjs.compareSync(password, validuser.password);
    if (!validpassword) {
      return next(errorhandler(406, "Incorrect Credentials"));
    }

    const token = jwt.sign({ id: validuser._id }, process.env.jwt_secret);
    const { password: pass, ...rest } = validuser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
