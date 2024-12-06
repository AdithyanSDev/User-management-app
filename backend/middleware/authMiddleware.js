import jwt from "jsonwebtoken";
import awaitsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = awaitsyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findbyId(decoded.userId).select("-password");
      next();
    } catch (error) {
      throw new Error("Not authorized,invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export {protect}