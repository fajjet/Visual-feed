// @ts-ignore
import jwt from 'jsonwebtoken';
import User from '../models/user';


export const auth = async(req: any, res: any, next: any) => {

  const { nextShouldBeCalled, token: bodyToken } = req.body;
  const token = req.cookies.token || bodyToken;

  try {

    const data = token && jwt.verify(token, process.env.JWT_KEY);

    if (!data) {
      throw new Error('You have no permission');
    }

    const user = await User.findOne({ _id: data._id, 'tokens.token': token });

    if (!user) {
      throw new Error('You have no permission');
    }

    res.locals.user = user;
    res.locals.userForClient = user.toObject();

    next();

  } catch (e) {
    if (nextShouldBeCalled) {
      res.status(409);
      next();
    } else {
      res.status(401);
    }
  }

};
