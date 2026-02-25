import mongoose, { Schema, Document } from "mongoose";

interface ILocation {
  state: string;
  city: string;
  street: string;
  pincode: number;
}

export interface IEvent extends Document {
  title: string;
  description: string;
  email: string;
  date: Date;
  status: "open" | "closed";
  location: ILocation;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true }, 
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },
    location: {
      state: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      pincode: { type: Number, required: true }
    }
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>("Event", eventSchema);