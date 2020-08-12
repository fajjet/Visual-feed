import jwt from 'jsonwebtoken';
import User from '../models/user';
import { Request, Response, NextFunction } from "express";

const throwPermissionError = () => { throw { error: 'You have no permission' } }

const authMain = async (req: Request, res: Response, next: NextFunction) => {
  const { token: bodyToken } = req.body;
  const token = req.cookies.token || bodyToken;

  const data: any = token && jwt.verify(token, process.env.JWT_KEY || '');
  if (!data) throwPermissionError();
  const user = await User.findOne({ _id: data._id, 'sessions.token': token }, { posts: 0 });
  if (!user) throwPermissionError();
  res.locals.user = user;
  res.locals.userForClient = user?.getClientData();
  next();
}

const authOnError = (req: Request, res: Response, next: NextFunction, error: Error) => {
  const { nextShouldBeCalled } = req.body;
  if (nextShouldBeCalled) {
    res.status(409);
    next();
  } else {
    res.status(401).send(error);
  }
};

export const auth = async(req: Request, res: Response, next: NextFunction) => {
  try {
    await authMain(req, res, next);
  } catch (error) {
    authOnError(req, res, next, error);
  }
};
