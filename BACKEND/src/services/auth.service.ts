import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { BadRequest } from "../ERRORHANDLER/httpError";
import { env } from "../config/env";
import { sendEmail } from "./mail.service";

const generateToken = (id: string) => {
  return jwt.sign(
    { id },
    env.JWT_SECRET as jwt.Secret,
    { expiresIn: env.JWT_EXPIRE } as jwt.SignOptions,
  );
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
) => {
  email = email.toLowerCase();

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequest("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();

  await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    verificationCode,
    verificationCodeExpire: new Date(Date.now() + 10 * 60 * 1000),
  });

  await sendEmail({
    to: email,
    subject: "Verify your email",
    text: `Your verification code is: ${verificationCode}`,
  });

  return { message: "Verification code sent to your email" };
};

export const verifyEmailService = async (email: string, code: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequest("Invalid email");
  }

  if (user.verificationCode !== code) {
    throw new BadRequest("Invalid verification code");
  }

  if (
    !user.verificationCodeExpire ||
    user.verificationCodeExpire < new Date()
  ) {
    throw new BadRequest("Verification code expired");
  }

  user.isVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpire = undefined;

  await user.save();

  const token = generateToken(user._id.toString());

  return { token, user };
};

export const loginUser = async (email: string, password: string) => {
  email = email.toLowerCase();

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequest("Invalid credentials");
  }

  if (!user.isVerified) {
    throw new BadRequest("Please verify your email first");
  }

  const token = generateToken(user._id.toString());

  return { token, user };
};
