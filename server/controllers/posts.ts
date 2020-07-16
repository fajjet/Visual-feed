import express, { Response } from 'express';
import cloudinary from 'cloudinary';
// @ts-ignore
import rateLimit from 'express-rate-limit';

import { auth } from '../middleware';
import Post from "../models/post";

const router = express.Router();

const allowedImageExts = ['jpg', 'jpeg', 'png', 'gif'];
const validateRegex = new RegExp(`.(${allowedImageExts.join('|')})$`, 'i');

const postCreationLimiter = rateLimit({
  windowMs: 1 * (60 * 1000),
  max: 5,
  message: {
    error: 'Too many requests to the server',
  }
});

const limit = rateLimit({
  windowMs: 1 * (60 * 1000),
  max: 15,
  message: {
    error: 'Too many requests to the server',
  }
});

router.post('/api/posts', postCreationLimiter, auth, async (req: any, res: Response) => {
  try {
    const { title, description, authorId } = req.body;
    const { image } = req.files;
    const creationTime = Date.now();

    if (!image) throw { error: 'Image is required' };

    const isValidExt = validateRegex.test(image.name);
    if (!isValidExt) throw { error: 'Allowed image extensions: ' + allowedImageExts.join(', ') };
    const sizeMb = image.size / 1024 / 1024;
    if (sizeMb > 1) throw { error: 'Image max size is 1 MB' };

    const uploadRes = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      width: 2000, height: 2000, crop: "limit"
    });

    const { secure_url: url } = uploadRes || {};
    if (!url) throw { error: `Image upload problem, try again later` };

    const post = new Post({ title, description, creationTime, authorId, image: url });
    await post.save();
    res.status(200).send({ post });

  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/api/posts', limit, async (req: any, res: Response) => {
  try{
    const posts = await Post.find({});
    res.status(200).send({ posts });
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

export default router;
