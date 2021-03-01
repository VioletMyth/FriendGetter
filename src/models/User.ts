import mongoose, {Schema} from "mongoose";
import IUser from "../interfaces/user"

const User = mongoose.model<IUser>(
  "User",
  new Schema({
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
  })
);

export default User;
