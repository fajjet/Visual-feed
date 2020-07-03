import express from 'express';
// @ts-ignore
import fetch from 'isomorphic-fetch';

import User from "../models/user";

const router = express.Router();

router.post('/api/users', async (req: express.Request, res: express.Response) => {
  try {
    const { user: userData, trace } = req.body;
    const user = new User(userData);
    await user.save();
    const token = await user.generateAuthToken(trace.ip, trace.uag);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/api/users/auth', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, ip, uag } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken(ip, uag);
    res.cookie('token', token, { httpOnly: true });
    res.locals.user = user;
    return res.send({ user, token });
  } catch (error) {
    return res.status(400).send(error)
  }
});

export default router;
