// @ts-ignore
import jwt from 'jsonwebtoken';
// import { clearUserData } from "../utils";
import User from '../models/user';


export const auth = async(req: any, res: any, next: any) => {

  const token = req.cookies.token || req.body.token;

  const data = token && jwt.verify(token, process.env.JWT_KEY);

  try {
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
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
