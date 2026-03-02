import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { getDashboardStats } from "../services/dashboard.service";

export const getDashboard = asyncHandler(
  async (req: Request, res: Response) => {
    const stats = await getDashboardStats();

    return successResponse(
      res,
      "Dashboard details fetched successfully",
      stats,
    );
  },
);
