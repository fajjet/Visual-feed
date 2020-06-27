import { Request, Response } from "express";
import User from "../models/user";

export let getUser = (req: Request, res: Response) => {
  res.send('1');
};

export let addUser = (req: Request, res: Response) => {
  const user = new User(req.body);
  User.findOne({ email: user.email })
    .then(find => {
      if (find !== null) {
        res.status(409).send('User already exists');
      } else {
        user.save()
          .then(e => {
            res.status(201).send(user)
          })
          .catch(err => res.status(500).send(err));
      }
    })
};
