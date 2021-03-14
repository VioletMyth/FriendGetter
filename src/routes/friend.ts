import { Request, Response, Router } from "express";
import IFriend from "../interfaces/friend";
import _ from "lodash";
import Friend from "../models/Friend";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  // const address = new Address({
  //   street_number: "28",
  //   address: "Hendon Avenue",
  //   suburb: "Mount Albert",
  //   city: "Auckland",
  //   country: "New Zealand",
  //   postal_code: 1041
  // })

  // address.save()
  const { first_name, last_name, address } = <IFriend>req.body;
  let friend = new Friend({
    first_name: first_name,
    last_name: last_name,
    address: address,
  });

  await friend.save();

  res.send(friend);
});

router.get("/", async (req: Request, res: Response) => {
  //Find all users
  const friends = await Friend.find();
  res.send(friends);
});

// router.put("/:id", async (req: Request, res: Response) => {
// 	const { _id } = req.body
// 	const friend = await Friend.findById(_id)
// 	if(!friend){
// 		return
// 	}
// 	friend.friends.push(friend)

// 	const result = await friend.save()

// 	res.send(result)
// })

export default router;
