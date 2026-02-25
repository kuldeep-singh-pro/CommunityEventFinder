import express from "express";
import cors from "cors";
import eventRouter from "./routes/event.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", eventRouter);

export default app;