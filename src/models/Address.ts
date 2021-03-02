import mongoose, { Schema } from "mongoose";
import IAddress from "../interfaces/address";

const addressSchema = new Schema({
  street_number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    maxLength: 200,
    unique: true,
  },
  suburb: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  city: {
    type: String,
    require: true,
    maxLength: 100,
  },
  country: {
    type: String,
    require: true,
    maxLength: 100,
  },
  postal_code: {
    type: Number,
    require: true,
    maxLength: 8,
  },
});

const Address = mongoose.model<IAddress>("Address", addressSchema);

export default Address;
