import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js'
import cors from 'cors'
import UploadRoute from './Routes/UploadRoute.js'
import path from 'path'

// app.use(cors(
//   {
//     origin:["https://Social-media-r3002.vercel.app"],
//     methods:["GET","POST","DELETE","OPTIONS","PUT"],
//     allowedHeaders:["Content-Type","Authorization"],
//     credentials:true,
//     optionsSuccessStatus:200,
//     preflightContinue:false,
//   }
// ));

// Routes

const app = express();
const __dirname = path.resolve();

//serve images for public
app.use(express.static(path.resolve(__dirname, "SocialMedia-Frontend", "build")));
app.use(express.json());
app.use(express.static('public'))
app.use('/images',express.static("images"))

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB,
  {useNewUrlParser:true,useUnifiedTopology:true}
  )
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening at ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));


  // usage of routes
  app.use('/auth', AuthRoute)
  app.use('/user', UserRoute)
  app.use('/post', PostRoute)
  app.use('/upload',UploadRoute)

  app.get("/",(req,res)=>
    {
      res.sendFile(path.resolve(__dirname, "SocialMedia-Frontend", "build", "index.html"));
    })