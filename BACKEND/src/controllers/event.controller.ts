import { Request, Response } from "express";
import Event from "../models/event.model";

export const createEvent = async (req: Request, res: Response) => {
  try {
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

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event" });
  }
};

export const joinEvent = async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.body;

    const event = await Event.findById(userId);

    if (!event) {
      res.status(400).json({ message: "Event Not Found", success: false });
    }
    if (status === "closed") {
      res.status(400).json({ message: "Event Is Closed", success: false });
    }

    if (userId as any) {
      res.status(400).json({ message: "Already Joined", success: false });
    }
    if (event) {
      res.status(201).json({
        success: true,
        message: "Event joined successfully",
        data: event,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event" });
  }
};


