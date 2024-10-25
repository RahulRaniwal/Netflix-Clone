import mongoose from 'mongoose';

// connect to db
const connectDb = async () =>{
  try{
    const connect = await mongoose.connect(process.env.MONGO_URI , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDb connected: ${connect.connection.host}`);
  }catch(error){
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDb;