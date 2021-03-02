import { Document } from "mongoose";

export default interface IAddress extends Document {
  street_number: string;
  address: string;
  suburb: string;
  city: string;
  country: string;
  postal_code: number;
}
