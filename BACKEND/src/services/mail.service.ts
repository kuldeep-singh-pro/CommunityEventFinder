import nodemailer from "nodemailer";
import { env } from "../config/env";

export const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Community Event Finder" <kuldeepsinghwebdev@gmail.com>`,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Email sending error:", error);
  }
};