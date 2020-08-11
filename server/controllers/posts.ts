import express, { Response, Request } from 'express';
import cloudinary from 'cloudinary';
import rateLimit from 'express-rate-limit';

import { auth } from '../middleware';
import Post from "../models/post";

const router = express.Router();

const allowedImageExts = ['jpg', 'jpeg', 'png', 'gif'];
const validateRegex = new RegExp(`.(${allowedImageExts.join('|')})$`, 'i');

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
    const { title, description, author } = req.body;
    const image: any = req.files?.image;
    const creationTime = Date.now();

    if (!image) throw { error: 'Image is required' };

    const isValidExt = validateRegex.test(image?.name);
    if (!isValidExt) throw { error: 'Allowed image extensions: ' + allowedImageExts.join(', ') };
    const sizeMb = image.size / 1024 / 1024;
    if (sizeMb > 1.5) throw { error: 'Image max size is 1.5 MB' };

    const uploadRes = await cloudinary.v2.uploader.upload(image.tempFilePath, {
      width: 2000, height: 2000, crop: "limit"
    });

    const { secure_url: url } = uploadRes || {};
    if (!url) throw { error: `Image upload problem, try again later` };

    const post = new Post({ title, description, creationTime, author, image: url });
    await post.save();
    const user = res.locals.user;
    res.status(200).send({ post: { ...post.toObject(), author: user } });

  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/api/posts/:page?', limit, async (req: Request, res: Response) => {
  try{
    const { page } = req.params;
    const posts = await Post.find({})
      .sort({ creationTime: -1 }).limit(5).skip(Number(page) || 0)
      .populate('author', 'firstName lastName fullName')
      .populate('likes', 'firstName lastName fullName');
    res.status(200).send({ posts });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/api/posts/user/:id', limit, async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const posts = await Post.find({ author: id }).sort({ creationTime: -1 })
      .populate('author', 'firstName lastName fullName')
      .populate('likes', 'firstName lastName fullName');
    res.status(200).send({ posts });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/api/posts/like/:id', limit, auth, async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const user = res.locals.user;
    const post = await Post.findOne({ _id: id })
      .populate('author', 'firstName lastName fullName')
      .populate('likes', 'firstName lastName fullName');
    if (!post) throw { error: 'Post not found' };
    if (!user) throw { error: 'Not authorized' };
    const postIsLiked = post.likes.filter(u => !!u).some(u => user._id.equals(u._id));
    if (postIsLiked) return res.status(200).send({ post });
    post.likes = post.likes.concat(user);
    await post.save();
    return res.status(200).send({ post });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.put('/api/posts/dislike/:id', limit, auth, async (req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const user = res.locals.user;
    const post = await Post.findOne({ _id: id })
      .populate('author', 'firstName lastName fullName')
      .populate('likes', 'firstName lastName fullName');
    if (!post) throw { error: 'Post not found' };
    if (!user) throw { error: 'Not authorized' };
    const postIsLiked = post.likes.filter(u => !!u).some(u => user._id.equals(u._id));
    if (!postIsLiked) return res.status(200).send({ post });
    post.likes = post.likes.filter(u => !!u && !user._id.equals(u._id));
    await post.save();
    return res.status(200).send({ post });
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
