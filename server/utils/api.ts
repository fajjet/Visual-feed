import cloudinary from "cloudinary";
import { UploadedFile } from 'express-fileupload';

import { validateImage } from "./helpers";
import {CloudinaryImage, ImageFormats } from "../../types";

export const handleImageUpload = async (image: UploadedFile | undefined) : Promise<CloudinaryImage | void> => {
  if (!image) throw { status: 400, error: 'Image is required' };
  validateImage(image);
  const uploadRes = await cloudinary.v2.uploader.upload(image.tempFilePath, {
    width: 2000, height: 2000, crop: "limit"
  });
  const { public_id, format, height, width } = uploadRes || {};
  if (!public_id) throw { status: 500, error: `Image upload problem, try again later` };
  return { id: public_id, format: format as ImageFormats, height, width };
};
