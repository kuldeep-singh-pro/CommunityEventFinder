import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { registerUser, loginUser } from "../services/auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const data = await registerUser(name, email, password, role);

  return successResponse(res, "User registered successfully", data, 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const data = await loginUser(email, password);

  return successResponse(res, "Login successful", data);
});