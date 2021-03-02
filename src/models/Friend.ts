import mongoose, { Schema } from "mongoose";
import IFriend from "../interfaces/friend";

const friendSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  last_name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "ref"
  },
})

const Friend = mongoose.model<IFriend>(
  "Friend",
  friendSchema
);

export default Friend;
