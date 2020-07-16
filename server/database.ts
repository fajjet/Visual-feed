// @ts-ignore
import mongoose from 'mongoose';
import cloudinary from "cloudinary";

const connection = process.env.DB_URL || '';

mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => console.log("Database Connected Successfully"))
  .catch((err: any) => console.log(err));

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

