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

import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const eventRouter = express.Router();

eventRouter.get("/", getEvent);

eventRouter.get("/popular", getPopularEvents);

eventRouter.post("/", protect, authorize("organizer"), createEvent);

eventRouter.post(
  "/:eventId/join",
  protect,
  authorize("participant"),
  joinEvent,
);

eventRouter.put("/:eventId", protect, authorize("organizer"), updateEvent);

eventRouter.patch(
  "/:eventId/close",
  protect,
  authorize("organizer"),
  closeEvent,
);

eventRouter.delete("/:eventId", protect, authorize("organizer"), deleteEvent);

export default eventRouter;
