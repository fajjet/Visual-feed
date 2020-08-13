import express, { Response, Request } from 'express';
import rateLimit from 'express-rate-limit';

import { handleImageUpload } from "../utils";
import { auth } from '../middleware';
import Post from "../models/post";

const router = express.Router();

const reqErrText = 'Too many requests to the server';

const postCreationLimiter = rateLimit({
  windowMs: 5 * (60 * 1000),
  max: 15,
  message: {
    status: 429,
    error: reqErrText,
    message: reqErrText,
  }
});

const limit = rateLimit({
  windowMs: 1 * (60 * 1000),
  max: 15,
  message: {
    status: 429,
    error: reqErrText,
    message: reqErrText,
  }
});

router.post('/api/posts', postCreationLimiter, auth, async (req: Request, res: Response) => {
  try {
    const image: any = req.files?.image;
    const url = await handleImageUpload(image);
    const post = await Post.createPost(req, url);
    res.status(200).send({ post: { ...post.toObject(), author: res.locals.user } });
  } catch (error) {
    res.status(error.status || 500).send(error);
  }
});

router.get('/api/posts/:page?', limit, async (req: Request, res: Response) => {
  try{
    const { page } = req.params;
    const posts = await Post.getPostsByPage(parseInt(page));
    res.status(200).send({ posts });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/api/posts/like/:id', limit, auth, async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const user = res.locals.user;
    const post = await Post.likePost(id, user);
    return res.status(200).send({ post });
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

router.put('/api/posts/dislike/:id', limit, auth, async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const user = res.locals.user;
    const post = await Post.dislikePost(id, user);
    return res.status(200).send({ post });
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

export default router;
