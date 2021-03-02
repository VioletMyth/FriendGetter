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
const router = express_1.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    let user = new User_1.default({
        name: name,
        email: email,
        password: password,
    });
    yield user.save();
    res.send(lodash_1.default.pick(user, ["name, email"]));
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Find all users
    const users = User_1.default.find();
    res.send(users);
}));
exports.default = router;