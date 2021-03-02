import { Request, Response, Router } from "express";
import User from "../models/User";
import IUser from "../interfaces/user";
import mongoose from "mongoose";
import _ from "lodash";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = <IUser>req.body;
  let user = new User({
    name: name,
    email: email,
    password: password,
  });

  await user.save();

  res.send(_.pick(user, ["name, email"]));
});

router.get("/", async (req: Request, res: Response) => {
  //Find all users
  const users = User.find();
  res.send(users);
});

export default router;
