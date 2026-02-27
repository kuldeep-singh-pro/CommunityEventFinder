import Express from "express";
import {
  createEvent,
  joinEvent,
  getEvent,
  getPopularEvents,
  updateEvent,
  deleteEvent,
  closeEvent,
} from "../controllers/event.controller";

const eventRouter = Express.Router();

eventRouter.post("/createEvent", createEvent);
eventRouter.post("/join", joinEvent);
eventRouter.get("/events", getEvent);
eventRouter.get("/events/popular", getPopularEvents);
eventRouter.put("/events/:eventId", updateEvent);
eventRouter.patch("/events/:eventId/close", closeEvent);
eventRouter.delete("/events/:eventId", deleteEvent);

export default eventRouter;