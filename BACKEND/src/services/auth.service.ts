import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { BadRequest } from "../ERRORHANDLER/httpError";
import { env } from "../config/env";

const generateToken = (id: string) => {
  return jwt.sign(
    { id },
    env.JWT_SECRET as jwt.Secret,
    { expiresIn: env.JWT_EXPIRE } as jwt.SignOptions
  );
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {
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

  return { token, user };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequest("Invalid credentials");
  }

  const token = generateToken(user._id.toString());

  return { token, user };
};