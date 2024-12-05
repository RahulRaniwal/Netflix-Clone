import express from 'express';
import cookieParser from "cookie-parser";
import path from 'path';

import authRoutes from './routes/auth.route.js'
import movieRoutes from "./routes/movie.route.js"
import tvRoutes from "./routes/tv.route.js"
import searchRoutes from "./routes/search.route.js";
import {protectRoute } from "./middleware/protectRoute.js"
import dotenv from 'dotenv';
import connectDb from './config/db.js';


dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

connectDb();

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/movie", protectRoute , movieRoutes);
app.use("/api/v1/tv" , protectRoute , tvRoutes);
app.use("/api/v1/search", protectRoute , searchRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname , "/frontend/dist")));

  app.get("*" , (req , res) =>{
    res.sendFile(path.resolve(__dirname , "frontend" , "dist" , "index.html"));
  })
}
app.listen(PORT , () =>{
  console.log(`Server is running on port ${PORT}`);
})
