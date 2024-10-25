import mongoose from 'mongoose';

const userSchema = mongoose.Schema({

  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,

  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    // select: false, // do not return password in response
  },
  image:{
    type: String,
    default: "",
  },
  searchHistory:{
    type: Array,
    default: [],
  }

},
  { timestamp: true, }
);

const User = mongoose.model('User' , userSchema);
export default User;