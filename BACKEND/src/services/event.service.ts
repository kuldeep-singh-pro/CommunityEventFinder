import Event from "../models/event.model";
import { NotFound, BadRequest, Forbidden } from "../ERRORHANDLER/httpError";

export const createEventService = async (data: any, userId: string) => {
  return Event.create({
    ...data,
    createdBy: userId,
  });
};

export const joinEventService = async (
  eventId: string,
  userId: string
) => {
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

  return event;
};

export const updateEventService = async (
  eventId: string,
  userId: string,
  body: any
) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new NotFound("Event not found");
  }

  if (event.createdBy.toString() !== userId.toString()) {
    throw new Forbidden("You are not allowed to update this event");
  }

  Object.assign(event, body);
  await event.save();

  return event;
};

export const closeEventService = async (
  eventId: string,
  userId: string
) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new NotFound("Event not found");
  }

  if (event.createdBy.toString() !== userId.toString()) {
    throw new Forbidden("You are not allowed to close this event");
  }

  event.status = "closed";
  await event.save();

  return event;
};

export const deleteEventService = async (
  eventId: string,
  userId: string
) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new NotFound("Event not found");
  }

  if (event.createdBy.toString() !== userId.toString()) {
    throw new Forbidden("You are not allowed to delete this event");
  }

  await event.deleteOne();
};

export const getEventsService = async (
  city: any,
  type: any,
  sort: any
) => {
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
    { $set: { status: "closed" } }
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

  return query;
};

export const fetchPopularEvents = async (limit = 10) => {
  return Event.aggregate([
    { $match: { status: "open" } },
    {
      $addFields: {
        participantsCount: { $size: { $ifNull: ["$participants", []] } },
      },
    },
    { $sort: { participantsCount: -1 } },
    { $limit: limit },
  ]);
};