import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { Unauthorized, BadRequest } from "../ERRORHANDLER/httpError";
import { getCalendarEventsService } from "../services/event.service";
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

  if (!req.user.isVerified) {
    throw new BadRequest("Please verify your email first");
  }

  const event = await createEventService(req.body, req.user._id.toString());

  return successResponse(res, "Event created successfully", event, 201);
});

export const joinEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  if (!req.user.isVerified) {
    throw new BadRequest("Please verify your email first");
  }

  const eventId =
    typeof req.params.eventId === "string" ? req.params.eventId : undefined;

  if (!eventId) {
    throw new BadRequest("Invalid event id");
  }

  await joinEventService(eventId, req.user._id.toString());

  return successResponse(res, "Event joined successfully");
});

export const getEvent = asyncHandler(async (req: Request, res: Response) => {
  const city = typeof req.query.city === "string" ? req.query.city : undefined;
  const type = typeof req.query.type === "string" ? req.query.type : undefined;
  const sort = typeof req.query.sort === "string" ? req.query.sort : undefined;
  const search =
    typeof req.query.search === "string" ? req.query.search : undefined;

  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 6;

  const result = await getEventsService({
    city,
    type,
    sort,
    search,
    page,
    limit,
  });

  return successResponse(res, "Events fetched successfully", result);
});

export const getPopularEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const limit =
      typeof req.query.limit === "string" ? Number(req.query.limit) : 10;

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

  const eventId =
    typeof req.params.eventId === "string" ? req.params.eventId : undefined;

  if (!eventId) {
    throw new BadRequest("Invalid event id");
  }

  const event = await updateEventService(
    eventId,
    req.user._id.toString(),
    req.body,
  );

  return successResponse(res, "Event updated successfully", event);
});

export const closeEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  const eventId =
    typeof req.params.eventId === "string" ? req.params.eventId : undefined;

  if (!eventId) {
    throw new BadRequest("Invalid event id");
  }

  const event = await closeEventService(eventId, req.user._id.toString());

  return successResponse(res, "Event closed successfully", event);
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Unauthorized("Not authorized");
  }

  const eventId =
    typeof req.params.eventId === "string" ? req.params.eventId : undefined;

  if (!eventId) {
    throw new BadRequest("Invalid event id");
  }

  await deleteEventService(eventId, req.user._id.toString());

  return successResponse(res, "Event deleted successfully");
});

export const getCalendarEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const month =
      typeof req.query.month === "string" ? Number(req.query.month) : undefined;

    const year =
      typeof req.query.year === "string" ? Number(req.query.year) : undefined;

    if (!month || !year) {
      throw new BadRequest("Month and year are required");
    }

    const events = await getCalendarEventsService(month, year);

    return successResponse(res, "Calendar events fetched", {
      count: events.length,
      events,
    });
  },
);
