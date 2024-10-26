import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'
import generateToken from '../utils/generateToken.js';


export const signup = async (req , res) =>{
  try {
    const {username , email , password} = req.body;

    // validate input
    if(!username || !email || !password){
      return res.status(400).json({success: false , message: 'All fields are required'});
    }
    // check for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({success: false , message: 'Invalid email'});
    }
    if(password.length < 8){
      return res.status(400).json({success: false , message: 'Password must be at least 8 characters long'});
    }
    // check if user already exist
    const existingUser = await User.findOne({email: email});

    if(existingUser){
      return res.status(400).json({success: false , message: 'User already exists'});
    }

    // hash the password
    const hashedPasssword = await bcrypt.hash(password , 12);

    // defalut avatar images
    const PROFILE_AVATAR = ["/avatar1.png" , "/avatar2.png" , "/avatar3.png"];

    const avatar = PROFILE_AVATAR[Math.floor(Math.random() * PROFILE_AVATAR.length)];

    // create a new user
    const user = new User({
      email: email,
      username: username,
      password:  hashedPasssword,
      image: avatar
    })

      generateToken(user._id , res);
      await user.save();
      res.status(201).json({ success: true, message: "User created successfully" });

    

  } catch (error) {
    console.error(`Error during signup: ${error.message}`);
    res.status(500).json({success: false , message: 'Server error'});
  }
}

export const login = async(req , res) =>{
  try {
    const {email , password} = req.body;

    // Validate input
    if(!email || !password){
      return res.status(400).json({success: false , message: 'All fields are required'});
    }

    // check if user exist
    const user = await User.findOne({email: email});
    if(!user){
      return res.status(404).json({success: false , message: 'User not found'});
    }
    // validate the password
    const isPasswordValid = await bcrypt.compare(password , user.password);
    if(!isPasswordValid){
      return res.status(400).json({success: false , message: 'Invalid password'});
    }
    // generate a jwt token
    generateToken(user._id , res);
    res.status(200).json({success: true , message: "Login successful",});
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    res.status(500).json({success: false , message: 'Server error'});
  }
}

export const logout = async(req , res) =>{
  try {
    // clear the jwt token
    res.clearCookie('jwt-netflix');
    // send the response to confirm logout
    return res.status(200).json({success: true , message: "User logged out successfully"});
  } catch (error) {
    console.log(`Error during logout: ${error.message}`);
    res.status(500).json({success: false , message: 'Server error during logout'});
  }
}