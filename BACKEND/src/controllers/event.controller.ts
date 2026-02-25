import { Request, Response } from "express";
import Event from "../models/event.model";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { title,discription, email, date, state, city, street, pincode } = req.body;

    const newEvent = await Event.create({
      title,
      discription,
      email,
      date,
      location: { state, city, street, pincode }
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating event " });
  }
};