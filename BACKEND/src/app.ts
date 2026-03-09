import  express from "express";
import cors from "cors";
import eventRouter from "./routes/event.routes";
import "./models/user.model";
import { errorMiddleware } from "./middleware/error.middleware";
import dashboardRouter from "./routes/dashboard.routes";
import authRouter from "./routes/auth.routes";
import helmet from "helmet";

const app = express();
app.use(helmet());

app.set("json spaces", 2);

app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

app.use("/api/events", eventRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/auth", authRouter);

export default app;
