import jwt from 'jsonwebtoken';

const generateToken = (userId , res) =>{
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN || "7d",});
  
  res.cookie("jwt-netflix" , token , {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite:"strict",
    secure:process.env.NODE_ENV !== "development",
  })
  return token;
};

export default generateToken;

