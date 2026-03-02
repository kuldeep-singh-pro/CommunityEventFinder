import { Request, Response, NextFunction } from "express";
import { HttpError } from "../ERRORHANDLER/httpError";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  console.error("Unhandled Error:", err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
