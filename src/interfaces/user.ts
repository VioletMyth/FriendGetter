import { Document, Schema } from "mongoose";

export default interface IFriend extends Document {
  name: string;
  email: string;
  password: string;
  friends: [Schema.Types.ObjectId];
  address: Schema.Types.ObjectId
  generateAuthToken(): string;
}
