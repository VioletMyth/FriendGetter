import { Request, Response, Router } from "express";
import User from "../models/User";
import IUser from "../interfaces/user"


const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const {name, email, password} = <IUser>req.body
  let user = new User({
    name: name,
    email: email,
    password: password
  });

  await user.save();
  res.send(user);
});

export default router;
