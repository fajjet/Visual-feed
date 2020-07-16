import express, { Response } from 'express';
import cloudinary from 'cloudinary';

import Post from "../models/post";

const router = express.Router();

router.post('/api/posts', async (req: any, res: Response) => {
  try {
    const { title, description, authorId } = req.body;
    const { image } = req.files;
    const creationTime = Date.now();

    if (!image) throw { error: 'Image is required' };

    const uploadRes = await cloudinary.v2.uploader.upload(image.tempFilePath);
    const { secure_url: url } = uploadRes || {};
    if (!url) throw { error: `Image upload problem, try again later` };

    const post = new Post({ title, description, creationTime, authorId, image: url });
    await post.save();
    res.status(200).send({ post });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
