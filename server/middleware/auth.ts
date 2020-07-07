// @ts-ignore
import jwt from 'jsonwebtoken';
import User from '../models/user';


export const auth = async(req: any, res: any, next: any) => {

  const { isInitialAuth, token: bodyToken } = req.body;
  const token = req.cookies.token || bodyToken;

  try {

    const data = token && jwt.verify(token, process.env.JWT_KEY);

    if (!data) {
      throw new Error('You have no permission');
    }

    const user = await User.findOne({ _id: data._id, 'tokens.token': token }, {
      password: 0,
      'tokens.token': 0,
    });

    if (!user) {
      throw new Error('You have no permission');
    }

    res.locals.user = user;
    next();

  } catch (e) {
    if (isInitialAuth) {
      res.status(409);
      next();
    } else {
      res.status(401);
    }
  }

};
