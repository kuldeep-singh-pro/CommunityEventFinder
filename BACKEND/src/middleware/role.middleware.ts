import { Request, Response, NextFunction } from "express";
import { Forbidden } from "../ERRORHANDLER/httpError";

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      throw new Forbidden("Access denied");
    }
    next();
  };
};
