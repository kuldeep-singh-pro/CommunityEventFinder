import { Request, Response } from "express";
import Event from "../models/event.model";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import {
  NotFound,
  Forbidden,
  BadRequest,
  Unauthorized,
} from "../ERRORHANDLER/httpError";
import { fetchPopularEvents } from "../services/event.service";
export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  const {
    title,
    description,
    email,
    date,
    address,
    city,
    state,
    latitude,
    longitude,
  } = req.body;

  const userId = req.user._id;

  const newEvent = await Event.create({
    title,
    description,
    email,
    date,
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
      address,
      city,
      state,
    },
    createdBy: userId,
  });

  return successResponse(res, "Event created successfully", newEvent, 201);
});

export const joinEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  const { eventId } = req.params;

  const event = await Event.findById(eventId);

  if (!event) {
    throw new NotFound("Event not found");
  }

  if (event.status === "closed") {
    throw new BadRequest("Event is closed");
  }

  const userId = req.user._id;
  if (event.participants.includes(userId)) {
    throw new BadRequest("Already joined");
  }

  event.participants.push(userId);
  await event.save();

  return successResponse(res, "Event joined successfully");
});

export const getEvent = asyncHandler(async (req: Request, res: Response) => {
  const { city, type, sort } = req.query;

  let filter: Record<string, unknown> = {};

  if (city) {
    filter["location.city"] = city;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (type === "today") {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    filter.date = { $gte: today, $lt: tomorrow };
  }

  if (type === "upcoming") {
    filter.date = { $gt: today };
  }

  await Event.updateMany(
    { date: { $lt: today }, status: "open" },
    { $set: { status: "closed" } },
  );

  let query = Event.find(filter)
    .populate("createdBy", "name email role")
    .populate("participants", "name email");

  if (sort === "latest") {
    query = query.sort({ createdAt: -1 });
  }

  if (sort === "date") {
    query = query.sort({ date: 1 });
  }

  const events = await query;

  return successResponse(res, "Events fetched successfully", {
    count: events.length,
    events,
  });
});

export const getPopularEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const limit = Number(req.query.limit) || 10;

    const events = await fetchPopularEvents(limit);

    return successResponse(res, "Popular events fetched successfully", {
      count: events.length,
      events,
    });
  },
);

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  const { eventId } = req.params;

  const event = await Event.findById(eventId);

  if (!event) {
    throw new NotFound("Event not found");
  }

  const userId = req.user._id;
  if (event.createdBy.toString() !== userId.toString()) {
    throw new Forbidden("You are not allowed to update this event");
  }

  Object.assign(event, req.body);
  await event.save();

  return successResponse(res, "Event updated successfully", event);
});

export const closeEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  const { eventId } = req.params;

  const event = await Event.findById(eventId);

  if (!event) {
    throw new NotFound("Event not found");
  }

  const userId = req.user._id;
  if (event.createdBy.toString() !== userId.toString()) {
    throw new Forbidden("You are not allowed to close this event");
  }

  event.status = "closed";
  await event.save();

  return successResponse(res, "Event closed successfully", event);
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  const { eventId } = req.params;

  const event = await Event.findById(eventId);

  if (!event) {
    throw new NotFound("Event not found");
  }

  const userId = req.user._id;
  if (event.createdBy.toString() !== userId.toString()) {
    throw new Forbidden("You are not allowed to delete this event");
  }

  await event.deleteOne();

  return successResponse(res, "Event deleted successfully");
});
