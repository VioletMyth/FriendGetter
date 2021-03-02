import { Request, Response, Router } from "express";
import User from "../models/User";
import IUser from "../interfaces/user";
import mongoose from "mongoose";
import _ from "lodash";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import config from "config"

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = <IUser>req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.send("Invalid email or password");
  }
  if (user!.password !== password) {
    return res.send("Invalid email or password");
  }

  const token = user.generateAuthToken();
  res.send(token);
});

export default router;
