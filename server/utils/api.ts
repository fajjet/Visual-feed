import cloudinary from "cloudinary";
import {CloudinaryImage, ImageFormats } from "../../types";

export const allowedImageExts = ['jpg', 'jpeg', 'png', 'gif'];
const validateRegex = new RegExp(`.(${allowedImageExts.join('|')})$`, 'i');

export const handleImageUpload = async (image: any) : Promise<CloudinaryImage | void> => {
  if (!image) throw { status: 400, error: 'Image is required' };
  const isValidExt = validateRegex.test(image?.name);
  const isGifExt = /.gif$/i.test(image?.name);

  if (!isValidExt) throw { status: 400, error: 'Allowed image extensions: ' + allowedImageExts.join(', ') };

  const sizeMb = image.size / 1024 / 1024;
  if (sizeMb > 1.5 && !isGifExt) throw { status: 400, error: 'Max regular image size is 1.5 MB' };
  if (sizeMb > 10 && isGifExt) throw { status: 400, error: 'Max gif image size is 10 MB' };

  const uploadRes = await cloudinary.v2.uploader.upload(image.tempFilePath, {
    width: 2000, height: 2000, crop: "limit"
  });

  const { public_id, format, height, width } = uploadRes || {};
  if (!public_id) throw { status: 500, error: `Image upload problem, try again later` };

  return { id: public_id, format: format as ImageFormats, height, width };
};
