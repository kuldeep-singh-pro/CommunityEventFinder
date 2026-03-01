import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { Unauthorized, BadRequest } from "../ERRORHANDLER/httpError";
import {
  createEventService,
  joinEventService,
  updateEventService,
  closeEventService,
  deleteEventService,
  getEventsService,
  fetchPopularEvents,
} from "../services/event.service";

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  const event = await createEventService(
    req.body,
    req.user._id.toString()
  );

  return successResponse(res, "Event created successfully", event, 201);
});

export const joinEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  const eventId =
    typeof req.params.eventId === "string"
      ? req.params.eventId
      : undefined;

  if (!eventId) {
    throw new BadRequest("Invalid event id");
  }

  await joinEventService(eventId, req.user._id.toString());

  return successResponse(res, "Event joined successfully");
});

export const getEvent = asyncHandler(async (req: Request, res: Response) => {
  const city =
    typeof req.query.city === "string" ? req.query.city : undefined;

  const type =
    typeof req.query.type === "string" ? req.query.type : undefined;

  const sort =
    typeof req.query.sort === "string" ? req.query.sort : undefined;

  const events = await getEventsService(city, type, sort);

  return successResponse(res, "Events fetched successfully", {
    count: events.length,
    events,
  });
});

export const getPopularEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const limit =
      typeof req.query.limit === "string"
        ? Number(req.query.limit)
        : 10;

    const events = await fetchPopularEvents(limit);

    return successResponse(res, "Popular events fetched successfully", {
      count: events.length,
      events,
    });
  }
);

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  const eventId =
    typeof req.params.eventId === "string"
      ? req.params.eventId
      : undefined;

  if (!eventId) {
    throw new BadRequest("Invalid event id");
  }

  const event = await updateEventService(
    eventId,
    req.user._id.toString(),
    req.body
  );

  return successResponse(res, "Event updated successfully", event);
});

export const closeEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  const eventId =
    typeof req.params.eventId === "string"
      ? req.params.eventId
      : undefined;

  if (!eventId) {
    throw new BadRequest("Invalid event id");
  }

  const event = await closeEventService(
    eventId,
    req.user._id.toString()
  );

  return successResponse(res, "Event closed successfully", event);
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  const eventId =
    typeof req.params.eventId === "string"
      ? req.params.eventId
      : undefined;

  if (!eventId) {
    throw new BadRequest("Invalid event id");
  }

  await deleteEventService(
    eventId,
    req.user._id.toString()
  );

  return successResponse(res, "Event deleted successfully");
});