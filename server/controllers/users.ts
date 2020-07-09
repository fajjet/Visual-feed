import express, {Request, Response} from 'express';
// @ts-ignore
import fetch from 'isomorphic-fetch';
import { auth } from '../middleware';

import User, {IUser} from "../models/user";

const router = express.Router();

router.post('/api/users', async (req: express.Request, res: express.Response) => {
  try {
    const { user: userData, trace } = req.body;
    const existedUser = await User.findOne({ email: userData.email });
    if (existedUser) throw { error: 'User with the same email already exists' };
    const user = new User(userData);
    await user.save();
    const { token, id } = await user.generateAuthToken(trace, 1);
    const clienData = user.getClientData();
    res.cookie('token', token, { httpOnly: true });
    res.status(201).send({ user: clienData, tokenId: id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/api/users/auth', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, trace, date } = req.body;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const { token, id } = await user.generateAuthToken(trace, date);
    const clientData = user.getClientData();

    res.cookie('token', token, { httpOnly: true });
    return res.send({ user: clientData, tokenId: id });

  } catch (error) {
    return res.status(400).send(error);
  }
});

router.all('/api/users/me', auth, (req: Request, res: Response) => {
  const { userForClient } = res.locals;
  if (res.statusCode === 409) {
    res.clearCookie('token');
  }
  res.send(userForClient);
});

router.post('/api/users/logout', auth, async (req: express.Request, res: express.Response) => {
  try {
    // const { selection } = req.body;
    const user: IUser = res.locals.user;
    const { token: cToken } = req.cookies;
    res.clearCookie('token');
    user.tokens = user.tokens.filter((token) => {
      return token.token !== cToken;
    });
    await user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error)
  }
});

export default router;
