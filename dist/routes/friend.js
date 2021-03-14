"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Friend_1 = __importDefault(require("../models/Friend"));
const router = express_1.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const address = new Address({
    //   street_number: "28",
    //   address: "Hendon Avenue",
    //   suburb: "Mount Albert",
    //   city: "Auckland",
    //   country: "New Zealand",
    //   postal_code: 1041
    // })
    // address.save()
    const { first_name, last_name, address } = req.body;
    let friend = new Friend_1.default({
        first_name: first_name,
        last_name: last_name,
        address: address,
    });
    yield friend.save();
    res.send(friend);
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Find all users
    const friends = yield Friend_1.default.find();
    res.send(friends);
}));
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
exports.default = router;
