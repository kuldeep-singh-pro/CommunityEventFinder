import express from "express";
import {
  register,
  login,
  verifyEmail,
} from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import {
  registerSchema,
  loginSchema,
} from "../dto/auth.dto";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/verify-email", verifyEmail);
router.post("/login", validate(loginSchema), login);

export default router;