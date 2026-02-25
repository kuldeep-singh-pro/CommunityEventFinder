import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db";
import app from "./app";


connectDB();  


app.listen(5000, () => {
  console.log("Server running on port 5000");
});