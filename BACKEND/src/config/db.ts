import mongoose from "mongoose";
import { env } from "../config/env";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(env.MONGO_URI, {
      family: 4,
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("Mongo Error:", error);
    process.exit(1);
  }
};

export default connectDB;
