import { Request, Response, Router } from "express";
import User from "../models/User";
import IFriend from "../interfaces/user";
import _ from "lodash";
// import Friend from "../models/Friend";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = <IFriend>req.body;
  let user = new User({
    name: name,
    email: email,
    password: password,
  });

  await user.save();

  const token = user.generateAuthToken()
  res.header("x-auth-token", token);
  res.send(_.pick(user, ["name, email"]));
});

router.get("/", async (req: Request, res: Response) => {
  //Find all users
  const users = User.find();
  res.send(users);
});

router.put("/:id", async (req: Request, res: Response) => {
	const { _id, friend } = req.body
	const user = await User.findById(_id)
	if(!user){
		return
	}
	user.friends.push(friend)

	const result = await user.save()

	res.send(result)
})

export default router;
