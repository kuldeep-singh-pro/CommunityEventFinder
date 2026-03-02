import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { successResponse } from "../utils/response";
import { BadRequest } from "../ERRORHANDLER/httpError";
import { env } from "../config/env";

const generateToken = (id: string) => {
  return jwt.sign(
    { id },
    env.JWT_SECRET as jwt.Secret,
    { expiresIn: env.JWT_EXPIRE } as jwt.SignOptions,
  );
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequest("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  const token = generateToken(user._id.toString());

  return successResponse(
    res,
    "User registered successfully",
    {
      token,
      user,
    },
    201,
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequest("Invalid credentials");
  }

  const token = generateToken(user._id.toString());

  return successResponse(res, "Login successful", {
    token,
    user,
  });
});
