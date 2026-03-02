import Event from "../models/event.model";
import { fetchPopularEvents } from "./event.service";

export const getDashboardStats = async () => {
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

  return {
    totalEvents,
    openEvents,
    closedEvents,
    totalParticipant,
    popularEvent,
  };
};
