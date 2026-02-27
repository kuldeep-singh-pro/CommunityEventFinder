import { Request, Response } from "express";
import Event from "../models/event.model";
import User from "../models/user.model";
import { fetchPopularEvents } from "../services/event.service";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { BadRequest, NotFound } from "../ERRORHANDLER/commanErrorHandler";

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
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
    userId,
  } = req.body;

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
  const { eventId, userId } = req.body;

  const event = await Event.findById(eventId);

  if (!event) {
    throw new NotFound("Event not found");
  }

  if (event.status === "closed") {
    throw new BadRequest("Event is closed");
  }

  if (event.participants.includes(userId as any)) {
    throw new BadRequest("Already joined");
  }

  event.participants.push(userId as any);
  await event.save();

  return successResponse(res, "Event joined successfully");
});

export const getEvent = asyncHandler(async (req: Request, res: Response) => {
  const { city, type, sort } = req.query;

  let filter: any = {};

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
    const events = await fetchPopularEvents(10);

    return successResponse(res, "Popular events fetched", {
      count: events.length,
      events,
    });
  },
);

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const updateData: any = { ...req.body };

  if (updateData.latitude && updateData.longitude) {
    updateData.location = {
      type: "Point",
      coordinates: [updateData.longitude, updateData.latitude],
      address: updateData.address,
      city: updateData.city,
      state: updateData.state,
    };
    delete updateData.latitude;
    delete updateData.longitude;
  }

  const updated = await Event.findByIdAndUpdate(eventId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    throw new NotFound("Event not found");
  }

  return successResponse(res, "Event updated successfully", updated);
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  const { eventId } = req.params;

  const deleted = await Event.findByIdAndDelete(eventId);
  if (!deleted) {
    throw new NotFound("Event not found");
  }

  return successResponse(res, "Event deleted successfully");
});

export const closeEvent = asyncHandler(async (req: Request, res: Response) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId);

  if (!event) {
    throw new NotFound("Event not found");
  }

  event.status = "closed";
  await event.save();

  return successResponse(res, "Event closed successfully", event);
});
