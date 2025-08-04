// utils/jwt.js
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret"; // Store in .env in real apps

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, mobile: user.mobile }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
