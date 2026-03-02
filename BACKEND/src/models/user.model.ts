import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "organizer" | "participant";
  isVerified: boolean;
  verificationCode?: string;
  verificationCodeExpire?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["organizer", "participant"],
      default: "participant",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: String,
    verificationCodeExpire: Date,
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("User", userSchema);
