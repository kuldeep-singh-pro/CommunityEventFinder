import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: "organizer" | "participant";
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ["organizer", "participant"],
      default: "participant",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("User", userSchema);
