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

// export const google = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = user._doc;
//       res
//         .cookie('access_token', token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new User({
//         username:
//           req.body.name.split(' ').join('').toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPassword,
//         avatar: req.body.photo,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = newUser._doc;
//       res
//         .cookie('access_token', token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
export const google = async (req, res, next) => {
  try {
    // console.log("Request Body:", req.body); // Log the request body to inspect received data

    const { email, name, photo } = req.body; // Extract 'picture' in case it's used instead of 'photo'

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required for Google authentication." });
    }

    const validuser = await User.findOne({ email });

    if (validuser) {
      const token = jwt.sign({ id: validuser._id }, process.env.jwt_secret);
      const { password: pass, ...rest } = validuser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedpassword = Math.random().toString(36).slice(-8);
      const hashpassword = bcryptjs.hashSync(generatedpassword, 10);

      const username = name
        ? name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4)
        : `user${Math.random().toString(36).slice(-6)}`; // Default username if `name` is missing

      const newuser = new User({
        username,
        email,
        password: hashpassword,
        // Use 'photo' if available; otherwise, try 'picture'; fallback to default if both are missing
        photo: photo,
      });

      await newuser.save();
      const token = jwt.sign({ id: newuser._id }, process.env.jwt_secret);
      const { password: pass, ...rest } = newuser._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};
