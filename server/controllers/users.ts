import express, {Request, Response} from 'express';
import bcrypt from 'bcrypt';

import { auth } from '../middleware';

import { LogoutSelectionType } from "../../types";
import User, {IUser, IUserDocument} from "../models/user";

const router = express.Router();

router.get('/api/users', async (req: express.Request, res: express.Response) => {
  try {
    const users = await User.find({}, {
      password: 0,
      sessions: 0,
    });
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/api/users/:id', async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }, {
      password: 0,
      sessions: 0,
    });
    res.status(200).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/api/users', async (req: express.Request, res: express.Response) => {
  try {
    const { user: userData, trace } = req.body;
    const existedUser = await User.findOne({ email: userData.email });
    if (existedUser) throw { error: 'User with the same email already exists' };
    const user = new User(userData);
    await user.save();
    const { token, id } = await user.generateAuthToken(trace);
    res.cookie('token', token, { httpOnly: true });
    res.status(201).send({ user: user.getClientData(), tokenId: id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/api/users/auth', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, trace } = req.body;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
    }
    const { token, id } = await user.generateAuthToken(trace);
    const clientData = user?.getClientData();

    res.cookie('token', token, { httpOnly: true });
    return res.send({ user: clientData, tokenId: id });

  } catch (error) {
    return res.status(400).send(error);
  }
});

router.all('/api/users/me', auth, async (req: Request, res: Response) => {
  try {
    const { isClient } = req.body;
    const user: IUser = res.locals.user;
    if (isClient && res.statusCode === 200) {
      const { token: cookieToken } = req.cookies;
      const now = Date.now();
      user.sessions = user.sessions.map(s => {
        if (s.token === cookieToken) s.lastSeenDate = now;
        return s;
      });
      await user.save();
    }
    if (res.statusCode === 409) {
      res.clearCookie('token');
      res.clearCookie('tokenId');
    }
    res.send(user?.getClientData());
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/api/users/logout', auth, async (req: express.Request, res: express.Response) => {
  try {
    const selection: LogoutSelectionType = req.body.selection;
    const user: IUser = res.locals.user;
    const { token: cookieToken } = req.cookies;
    if (selection === 'current') res.clearCookie('token');
    if (selection === 'all') {
      user.sessions = [];
    } else {
      user.sessions = user.sessions.filter((session) => {
        return selection === 'current' ? session.token !== cookieToken : String(session._id) !== selection.id;
      });
    }
    await user.save();
    res.send({ user: user?.getClientData() });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/api/users', auth, async (req: express.Request, res: express.Response) => {
  try {
    const updatedData: IUserDocument = req.body.user;
    const user: IUser = res.locals.user;
    if (!user) throw { error: 'Auth error' };
    if (!updatedData) throw { error: 'Empty body' };
    const { firstName, lastName } = updatedData;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    await user.save();
    res.status(200).send({ user: user.getClientData() });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/api/users/password', auth, async (req: express.Request, res: express.Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user: IUser = res.locals.user;
    if (!user) throw { error: 'Unauthorized' };
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password || '');
    if (!isPasswordMatch) throw { error: 'Current password does not match' };
    user.password = newPassword;
    await user.save();
    res.status(200).send({ user: user.getClientData() });
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
