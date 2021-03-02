import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";
import jwt from "jsonwebtoken"
import config from "config"

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
  address: {
    type: String,
    require: true,
    maxLength: 200,
  },
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token
}

const User = mongoose.model<IUser>(
  "User",
  userSchema
);

export default User;
