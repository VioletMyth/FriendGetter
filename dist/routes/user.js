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
const User_1 = __importDefault(require("../models/User"));
const lodash_1 = __importDefault(require("lodash"));
const joi_1 = __importDefault(require("joi"));
// import Friend from "../models/Friend";
const router = express_1.Router();
const userSchemaValidation = joi_1.default.object({
    name: joi_1.default.string().pattern(new RegExp("^[a-zA-Z]+$")).required(),
    email: joi_1.default.string().pattern(new RegExp("/emailRegex")).required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isValidBody = userSchemaValidation.validate(req.body);
    if (!isValidBody) {
        res.status(400).send("An error has occured in the request");
        return;
    }
    const { name, email, password } = req.body;
    // console.log(req);
    let user = new User_1.default({
        name: name,
        email: email,
        password: password,
    });
    yield user.save();
    const token = user.generateAuthToken();
    res.header("x-auth-token", token);
    res.send(lodash_1.default.pick(user, ["name, email"]));
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Find all users
    const users = yield User_1.default.find();
    res.send(users);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, friend } = req.body;
    const user = yield User_1.default.findById(_id);
    if (!user) {
        return;
    }
    user.friends.push(friend);
    const result = yield user.save();
    res.send(result);
}));
exports.default = router;
