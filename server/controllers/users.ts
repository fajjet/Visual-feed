import express, {Request, Response} from 'express';
import rateLimit from 'express-rate-limit';

import { auth } from '../middleware';

import { LogoutSelectionType, UserCreationPayload, Trace } from "../../types";
import User, {IUser} from "../models/user";

const reqErrText = 'Too many requests to the server';

const apiLimiter = rateLimit({
  windowMs: 1 * (60 * 1000),
  max: 30,
  message: {
    status: 429,
    message: reqErrText,
    error: reqErrText,
  },
});

const signUpLimit = rateLimit({
  windowMs: 5 * (60 * 1000),
  max: 10,
  message: {
    status: 429,
    message: reqErrText,
    error: reqErrText,
  },
});

const router = express.Router();

router.get('/api/users', apiLimiter, async (req: express.Request, res: express.Response) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).send({ users });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/api/users/user/:id', apiLimiter, async (req: express.Request, res: express.Response) => {
  try {
    const user = await User.getUserById(req.params.id);
    res.status(200).send({ user });
  } catch (error) {
    res.status(error.status || 500).send(error);
  }
});

router.post('/api/users', signUpLimit, async (req: express.Request, res: express.Response) => {
  try {
    const { user: userData, trace } : { user: UserCreationPayload, trace: Trace } = req.body;
    const user = await User.createUser(userData);
    const { token, id } = await user.generateAuthToken(trace);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.status(201).send({ user, tokenId: id });
  } catch (error) {
    res.status(error.status || 409).send(error);
  }
});

router.post('/api/users/auth', apiLimiter, async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, trace } = req.body;
    const user = await User.findByCredentials(email, password);
    const { token, id } = await user.generateAuthToken(trace);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return res.send({ user: user.toObject(), tokenId: id });
  } catch (error) {
    return res.status(error.status || 400).send(error);
  }
});

router.all('/api/users/me', apiLimiter, auth, async (req: Request, res: Response) => {
  try {
    const isClient: boolean = req.body.isClient;
    const user: IUser = res.locals.user;
    if (isClient && res.statusCode === 200) await user.updateLastSeenDate(req.cookies);
    if (res.statusCode === 409) {
      res.clearCookie('token');
      res.clearCookie('tokenId');
    }
    res.send(user?.getClientData());
  } catch (error) {
    res.status(401).send(error);
  }
});

router.post('/api/users/logout', apiLimiter, auth, async (req: express.Request, res: express.Response) => {
  try {
    const selection: LogoutSelectionType = req.body.selection;
    const user: IUser = res.locals.user;
    const { token } = req.cookies;
    if (selection === 'current') res.clearCookie('token');
    await user.logout(token, selection);
    res.send({ user: user.getClientData() });
  } catch (error) {
    res.status(error.status || 500).send(error);
  }
});

router.put('/api/users', apiLimiter, auth, async (req: express.Request, res: express.Response) => {
  try {
    const data = req.body.user;
    const user: IUser = res.locals.user;
    await user.updateUser(data);
    res.status(200).send({ user: user.getClientData() });
  } catch (error) {
    res.status(error.status || 409).send(error);
  }
});

router.put('/api/users/password', apiLimiter, auth, async (req: express.Request, res: express.Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user: IUser = res.locals.user;
    await user.changePassword(currentPassword, newPassword);
    res.status(200).send({ user: user.getClientData() });
  } catch (error) {
    res.status(error.status || 409).send(error);
  }
});

export default router;
