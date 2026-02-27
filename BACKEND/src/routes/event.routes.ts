import express from "express";
import {
  createEvent,
  joinEvent,
  getEvent,
  getPopularEvents,
  updateEvent,
  deleteEvent,
  closeEvent,
} from "../controllers/event.controller";

const eventRouter = express.Router();

eventRouter.post("/", createEvent);

eventRouter.get("/", getEvent);

eventRouter.get("/popular", getPopularEvents);

eventRouter.post("/:eventId/join", joinEvent);

eventRouter.put("/:eventId", updateEvent);

eventRouter.patch("/:eventId/close", closeEvent);

eventRouter.delete("/:eventId", deleteEvent);

export default eventRouter;
