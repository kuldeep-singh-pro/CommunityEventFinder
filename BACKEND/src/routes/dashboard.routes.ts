import Express from "express";

import { getDashboard } from "../controllers/dashboard.controller";

const router = Express.Router();

router.get("/", getDashboard);

export default router;
