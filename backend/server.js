import express from 'express';
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv';
import connectDb from './config/db.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

connectDb();

app.use(express.json());


app.use("/api/v1/auth" , authRoutes);

app.listen(PORT , () =>{
  console.log(`Server is running on port ${PORT}`);
})