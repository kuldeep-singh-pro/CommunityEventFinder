import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  email: z.email(),
  date: z.string(),
  address: z.string().min(3),
  city: z.string().min(2),
  state: z.string().min(2),
  latitude: z.number(),
  longitude: z.number(),
});
