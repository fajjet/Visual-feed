import express, { Response, Request } from "express";
import rateLimit from "express-rate-limit";
import { UploadedFile } from "express-fileupload";

import { IUser } from "../models/user";
import { handleImageUpload } from "../utils";
import { auth } from "../middleware";
import Post from "../models/post";

const router = express.Router();

const reqErrText = "Too many requests to the server";
const message = {
  status: 429,
  error: reqErrText,
  message: reqErrText,
};

const postCreationLimiter = rateLimit({
  windowMs: 5 * (60 * 1000),
  max: 15,
  message,
});
const limit = rateLimit({ windowMs: 1 * (60 * 1000), max: 15, message });

router.post(
  "/api/posts",
  postCreationLimiter,
  auth,
  async (req: Request, res: Response) => {
    try {
      const image = req.files?.image;
      const imageInfo = await handleImageUpload(image as UploadedFile);
      const user: IUser = res.locals.user;
      if (imageInfo) {
        const post = await Post.createPost(req, imageInfo, user);
        res.status(201).send({ post: { ...post.toObject(), author: user } });
      } else {
        throw { error: "Internal server error" };
      }
    } catch (error) {
      res.status(error.status || 500).send(error);
    }
  }
);

router.get(
  "/api/posts/all/:page?/:authorId?",
  limit,
  async (req: Request, res: Response) => {
    try {
      const { page, authorId } = req.params;
      const posts = await Post.getPostsByPage(parseInt(page), authorId);
      res.status(200).send({ posts });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.get("/api/posts/:id", limit, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.getPostById(id);
    res.status(200).send({ post });
  } catch (error) {
    res.status(error.status || 400).send(error);
  }
});

router.put(
  "/api/posts/like/:id",
  limit,
  auth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = res.locals.user;
      const post = await Post.likePost(id, user);
      return res.status(200).send({ post });
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  }
);

router.put(
  "/api/posts/dislike/:id",
  limit,
  auth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = res.locals.user;
      const post = await Post.dislikePost(id, user);
      return res.status(200).send({ post });
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  }
);

router.post(
  "/api/posts/comment/:id",
  limit,
  auth,
  async (req: Request, res: Response) => {
    try {
      const user: IUser = res.locals.user;
      const post = await Post.commentPost(user, req);
      return res.status(201).send({ post });
    } catch (error) {
      return res.status(error.status || 500).send(error);
    }
  }
);

export default router;
