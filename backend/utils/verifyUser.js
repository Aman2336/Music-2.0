import jwt from 'jsonwebtoken';
import { errorhandler } from '../utils/error.js';

// Middleware to verify the token
export const verifyToken = (req, res, next) => {
  // Retrieve the token from cookies
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorhandler(401, "Unauthorized"));
  }
  // Verify the token
  jwt.verify(token, process.env.jwt_secret, (err, user) => {
    if (err) {
      return next(errorhandler(403, "Forbidden"));
    }

    // Attach user information to the request
    req.user = user;
    next();
  });
};

