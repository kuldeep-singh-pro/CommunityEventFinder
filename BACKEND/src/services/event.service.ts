import mongoose from "mongoose";
import Event from "../models/event.model";
import { NotFound, BadRequest, Forbidden } from "../ERRORHANDLER/httpError";

export const createEventService = async (data: any, userId: string) => {
  return Event.create({
    ...data,
    createdBy: userId,
  });
};

export const joinEventService = async (eventId: string, userId: string) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new NotFound("Event not found");
  }

  if (event.status === "closed") {
    throw new BadRequest("Event is closed");
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);

  const alreadyJoined = event.participants.some(
    (participant) => participant.toString() === userObjectId.toString(),
  );

  if (alreadyJoined) {
    throw new BadRequest("Already joined");
  }

  event.participants.push(userObjectId);
  await event.save();

  return event;
};

export const updateEventService = async (
  eventId: string,
  userId: string,
  body: any,
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

export const closeEventService = async (eventId: string, userId: string) => {
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

export const deleteEventService = async (eventId: string, userId: string) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new NotFound("Event not found");
  }

  if (event.createdBy.toString() !== userId.toString()) {
    throw new Forbidden("You are not allowed to delete this event");
  }

  await event.deleteOne();
};

interface GetEventsParams {
  city?: string;
  type?: string;
  sort?: string;
  search?: string;
  page: number;
  limit: number;
}

export const getEventsService = async ({
  city,
  type,
  sort,
  search,
  page,
  limit,
}: GetEventsParams) => {
  const filter: any = {};

  if (city) {
    filter["location.city"] = city;
  }

  if (search) {
    filter.title = { $regex: search, $options: "i" };
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

  const skip = (page - 1) * limit;

  let query = Event.find(filter)
    .populate("createdBy", "name email role")
    .populate("participants", "name email");

  if (sort === "latest") {
    query = query.sort({ createdAt: -1 });
  }

  if (sort === "date") {
    query = query.sort({ date: 1 });
  }

  const total = await Event.countDocuments(filter);

  const events = await query.skip(skip).limit(limit);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    count: events.length,
    events,
  };
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

export const getCalendarEventsService = async (month: number, year: number) => {
  if (!month || !year) {
    throw new BadRequest("Month and year are required");
  }

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const events = await Event.find({
    date: { $gte: start, $lte: end },
  })
    .select("title date location status")
    .sort({ date: 1 });

  return events;
};
