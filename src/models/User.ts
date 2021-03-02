import mongoose, { Schema } from "mongoose";
import IFriend from "../interfaces/user";
import jwt from "jsonwebtoken";
import config from "config";

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
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "Friend"
  }],
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address"
  }
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model<IFriend>("User", userSchema);

export default User;
