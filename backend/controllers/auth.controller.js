import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'


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

    await user.save();

    res.status(201).json({success: true , message: 'User created successfully'});

  } catch (error) {
    console.error(`Error during signup: ${error.message}`);
    res.status(500).json({success: false , message: 'Server error'});
  }
}

export const login = async(req , res) =>{
  res.send('Login route');
}

export const logout = async(req , res) =>{
  res.send('Logout route');
}