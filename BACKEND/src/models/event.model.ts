import mongoose, { Schema, model } from "mongoose";

const locationSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
  },
  address: String,
  street: String,
  city: String,
  state: String,
  pincode: Number,
});

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
    location: locationSchema,
    maxParticipants: {
      type: Number,
      default: 100,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

eventSchema.index({ title: "text", description: "text" });

export default model("Event", eventSchema);