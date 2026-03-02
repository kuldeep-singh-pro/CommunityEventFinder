import dotenv from "dotenv";

dotenv.config();

interface Env {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
  EMAIL_USER?: string;
  EMAIL_PASS?: string;
}

function getEnv(): Env {
  const {
    PORT = "5000",
    MONGO_URI,
    JWT_SECRET,
    JWT_EXPIRE = "1d",
    EMAIL_USER,
    EMAIL_PASS,
  } = process.env;

  if (!MONGO_URI) throw new Error("MONGO_URI is required");
  if (!JWT_SECRET) throw new Error("JWT_SECRET is required");

  return {
    PORT: Number(PORT),
    MONGO_URI,
    JWT_SECRET,
    JWT_EXPIRE,
    EMAIL_USER,
    EMAIL_PASS,
  };
}

export const env = getEnv();
