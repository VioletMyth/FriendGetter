import { Document } from "mongoose";
import IAddress from "./address";

export default interface IFriend extends Document {
  first_name: string;
  last_name: string;
  address: IAddress;
}
