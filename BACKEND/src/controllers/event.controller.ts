import { Request, Response } from "express";
import Event from "../models/event.model";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { BadRequest, NotFound } from "../ERRORHANDLER/commanErrorHandler";
import { sendEmail } from "../services/mail.service";


export const createEvent = asyncHandler(
  async (req: Request, res: Response) => {
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

    await sendEmail(
      email,
      "Event Created Successfully ",
      `
        <h2>${title}</h2>
        <p>Your event has been created successfully.</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Location:</strong> ${address}, ${city}, ${state}</p>
      `
    );

    return successResponse(
      res,
      "Event created successfully",
      newEvent,
      201
    );
  }
);


export const joinEvent = asyncHandler(
  async (req: Request, res: Response) => {
    const { eventId, userId } = req.params;

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

    await sendEmail(
      event.email,
      "New Participant Joined ",
      `
        <h3>Someone joined your event: ${event.title}</h3>
        <p>Total participants: ${event.participants.length}</p>
      `
    );

    return successResponse(res, "Event joined successfully");
  }
);


export const getEvent = asyncHandler(
  async (req: Request, res: Response) => {
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

    const events = await query;

    return successResponse(res, "Events fetched successfully", {
      count: events.length,
      events,
    });
  }
);

export const getPopularEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const events = await Event.aggregate([
      { $match: { status: "open" } },
      {
        $addFields: {
          participantsCount: { $size: "$participants" },
        },
      },
      { $sort: { participantsCount: -1 } },
      { $limit: 10 },
    ]);

    return successResponse(res, "Popular events fetched", {
      count: events.length,
      events,
    });
  }
);


export const getDashboard = asyncHandler(
  async (req: Request, res: Response) => {
    const totalEvents = await Event.countDocuments();
    const openEvents = await Event.countDocuments({ status: "open" });
    const closedEvents = await Event.countDocuments({ status: "closed" });

    const participantsAgg = await Event.aggregate([
      {
        $project: {
          participantsCount: { $size: "$participants" },
        },
      },
      {
        $group: {
          _id: null,
          totalParticipants: { $sum: "$participantsCount" },
        },
      },
    ]);

    const totalParticipants =
      participantsAgg.length > 0 ? participantsAgg[0].totalParticipants : 0;

    return successResponse(res, "Dashboard fetched successfully", {
      totalEvents,
      openEvents,
      closedEvents,
      totalParticipants,
    });
  }
);

export const updateEvent = asyncHandler(
  async (req: Request, res: Response) => {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      throw new NotFound("Event not found");
    }

    Object.assign(event, req.body);
    await event.save();

    return successResponse(res, "Event updated successfully", event);
  }
);


export const deleteEvent = asyncHandler(
  async (req: Request, res: Response) => {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      throw new NotFound("Event not found");
    }

    await event.deleteOne();

    return successResponse(res, "Event deleted successfully");
  }
);


export const closeEvent = asyncHandler(
  async (req: Request, res: Response) => {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);

    if (!event) {
      throw new NotFound("Event not found");
    }

    event.status = "closed";
    await event.save();

    return successResponse(res, "Event closed successfully", event);
  }
);