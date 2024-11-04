// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
  try {
    // extract the token
    const token = req.cookies["jwt-netflix"];

    if(!token){
      return res.status(401).json({success: false , message: "Unauthorized - No Token Provided"});
    }
    const decoded = jwt.verify(token , process.env.JWT_SECRET);

    if(!decoded){
      return res.status(401).json({success: false , message: "Unauthorized - Invalid Token"});
    }
    
    const user = await User.findById(decoded.id).select("-password");

    if(!user){
      return res.status(401).json({success: false , message: "Unauthorized - User Not Found"});
    }

    req.user = user;
    next();

  } catch (error) {
    console.log("Error in protectRoute middleware: " , error.message);
    res.status(500).json({success: false , message: "Internal Server Error"});
  }
};
