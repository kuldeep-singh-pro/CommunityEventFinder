import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { Unauthorized } from "../ERRORHANDLER/httpError";
import { env } from "../config/env";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new Unauthorized("Not authorized");
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, env.JWT_SECRET) as any;
  } catch (err) {
    throw new Unauthorized("Not authorized");
  }

  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    throw new Unauthorized("Not authorized");
  }

  req.user = user;

  next();
};
