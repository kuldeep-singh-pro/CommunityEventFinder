import Express from "express";
import { createEvent, joinEvent } from "../controllers/event.controller";

const eventRouter = Express.Router();

eventRouter.post("/createEvent", createEvent);
eventRouter.post("/joinEvent", joinEvent);
export default eventRouter;
