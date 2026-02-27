import { Request, Response } from "express";
import Event from "../models/event.model";
import { fetchPopularEvents } from "../services/event.service";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";

export const getDashboard = asyncHandler(
  async (req: Request, res: Response) => {
    const totalEvents = await Event.estimatedDocumentCount();

    const openEvents = await Event.countDocuments({ status: "open" });

    const closedEvents = await Event.countDocuments({ status: "closed" });

    const participantAg = await Event.aggregate([
      {
        $project: {
          participantsCount: { $size: { $ifNull: ["$participants", []] } },
        },
      },
      { $group: { _id: null, total: { $sum: "$participantsCount" } } },
    ]);

    const totalParticipant = participantAg[0]?.total || 0;

    const popularEvent = await fetchPopularEvents(5);

    return successResponse(res, "Dashboard details fetched successfully", {
      totalEvents,
      openEvents,
      closedEvents,
      totalParticipant,
      popularEvent,
    });
  },
);
