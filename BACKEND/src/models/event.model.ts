import mongoose, { Schema } from "mongoose";

interface Ilocation {
  state: string;
  city: string;
  street: string;
  pincode: number;
}

interface Istatus {
  statusIs: "open" | "closed";
}

export interface Ievent {
  title: string;
  discription:String;
  email: string;
  date: Date;
  status: Istatus;
  location: Ilocation;
}

const locationSchema = new Schema<Ilocation>({
  state: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  pincode: { type: Number, required: true },
});

const statusSchema = new Schema<Istatus>({
  statusIs: { type: String, required: true, default: "open" },
});

const eventSchema = new Schema<Ievent>(
  {
    title: { type: String, required: true },
     discription: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    status: { type: statusSchema, required: true },
    location: { type: locationSchema, required: true },
  },
  { timestamps: true }
);

const event = mongoose.model<Ievent>("event", eventSchema);

export default event;