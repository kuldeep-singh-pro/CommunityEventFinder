import nodemailer from "nodemailer";
import { env } from "../config/env";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
) => {
  await transporter.sendMail({
    from: `"Community Event" <${env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};