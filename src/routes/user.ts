import { Request, Response, Router } from "express";
import User from "../models/User";
import IUser from "../interfaces/user";
import IFriend from "../interfaces/user";
import _ from "lodash";
import Joi from "joi";
// import Friend from "../models/Friend";

const router = Router();

const userSchemaValidation = Joi.object({
  name: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")).required(),
  email: Joi.string().pattern(new RegExp("/emailRegex")).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

router.post("/", async (req: Request, res: Response) => {
  const isValidBody = userSchemaValidation.validate(req.body);
  if (!isValidBody) {
    res.status(400).send("An error has occured in the request");
    return;
  }

  const { name, email, password } = <IUser>req.body;
  // console.log(req);
  let user = new User({
    name: name,
    email: email,
    password: password,
  });

  await user.save();

  const token = user.generateAuthToken();
  res.header("x-auth-token", token);
  res.send(_.pick(user, ["name, email"]));
});

router.get("/", async (req: Request, res: Response) => {
  //Find all users
  const users = await User.find();
  res.send(users);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { _id, friend } = req.body;
  const user = await User.findById(_id);
  if (!user) {
    return;
  }
  user.friends.push(friend);

  const result = await user.save();

  res.send(result);
});

export default router;
