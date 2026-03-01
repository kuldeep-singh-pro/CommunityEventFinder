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
import { validate } from "../middleware/validate.middleware";
import { createEventSchema } from "../dto/event.dto";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, validate(createEventSchema), createEvent);
router.get("/", getEvent);
router.get("/popular", getPopularEvents);
router.post("/:eventId/join", protect, joinEvent);
router.put("/:eventId", protect, updateEvent);
router.patch("/:eventId/close", protect, closeEvent);
router.delete("/:eventId", protect, deleteEvent);

export default router;