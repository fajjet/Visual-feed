import express, { Request, Response } from 'express';

import Post from "../models/post";

const router = express.Router();

router.post('/api/posts', async (req: Request, res: Response) => {
  try {
    const { post: postData } = req.body;
    const creationTime = Date.now();
    const post = new Post({ ...postData, creationTime });
    await post.save();
    res.status(200).send({ post });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
