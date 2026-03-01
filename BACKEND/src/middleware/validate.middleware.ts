import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { BadRequest } from "../ERRORHANDLER/httpError";

export const validate =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message =
        result.error.issues[0]?.message || "Validation error";
      throw new BadRequest(message);
    }

    req.body = result.data;
    next();
  };